from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sbj_db')]

app = FastAPI(title="SBJ — The House of Cinematic Heritage")
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ============== MODELS ==============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ----- Lead models -----
class ConsultationLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    email: Optional[str] = None
    wedding_month: Optional[str] = None
    aesthetic: Optional[str] = None  # traditional / modern / fusion
    jewellery_focus: Optional[str] = None  # bridal-set / temple / emerald / pearls / modern
    family_notes: Optional[str] = None
    is_nri: Optional[bool] = False
    created_at: str = Field(default_factory=now_iso)
    type: Literal["consultation"] = "consultation"


class ConsultationLeadCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    wedding_month: Optional[str] = None
    aesthetic: Optional[str] = None
    jewellery_focus: Optional[str] = None
    family_notes: Optional[str] = None
    is_nri: Optional[bool] = False


class ReservationLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    email: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    party_size: Optional[int] = 1
    occasion: Optional[str] = None
    collection_interest: Optional[str] = None
    message: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)
    type: Literal["reservation"] = "reservation"


class ReservationLeadCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    party_size: Optional[int] = 1
    occasion: Optional[str] = None
    collection_interest: Optional[str] = None
    message: Optional[str] = None


class ConciergeLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    message: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)
    type: Literal["concierge"] = "concierge"


class ConciergeLeadCreate(BaseModel):
    full_name: str
    phone: str
    message: Optional[str] = None


# ----- Collection world data (curated, in-memory) -----
COLLECTIONS = [
    {
        "slug": "temple",
        "name": "The Temple of Heritage",
        "tagline": "Where Lakshmi walks in gold.",
        "mood": "Sacred. Architectural. Carved by hand.",
        "atmosphere": "carved-pillars",
        "accent": "#C9973A",
        "story": "Inspired by South Indian temples, every piece in this world carries a hymn — peacocks, lotuses, and the Goddess herself, rendered in antique gold.",
        "pieces": [
            {
                "id": "t-01",
                "name": "Lakshmi Pendant Haaram",
                "material": "22kt Antique Gold • Uncut Diamonds • Emeralds • Pearls",
                "story": "A bridal ensemble guarded by twin peacocks — designed to be worn the morning of the muhurtham.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png",
            },
            {
                "id": "t-02",
                "name": "Peacock Jhumka",
                "material": "22kt Gold • Burma Ruby • Pearl Drops",
                "story": "Twin peacocks unfurl their tails into a cascade of pearls — designed for ceremonial light.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png",
            },
            {
                "id": "t-03",
                "name": "Carved Lakshmi Kada",
                "material": "22kt Hand-Engraved Gold • Rubies",
                "story": "Each face of the kada is a tiny shrine — the karigar spent forty days on the carving alone.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png",
            },
        ],
    },
    {
        "slug": "emerald",
        "name": "The Emerald Chamber",
        "tagline": "A green so deep it remembers monsoons.",
        "mood": "Cool. Verdant. Royal.",
        "atmosphere": "emerald-mist",
        "accent": "#2B4A3F",
        "story": "Zambian and Colombian emeralds, hand-strung into rivers of green — chambers of jewellery cooled by waterfall light.",
        "pieces": [
            {
                "id": "e-01",
                "name": "Emerald Cascade Haaram",
                "material": "Colombian Emeralds • Uncut Diamonds • 22kt Gold",
                "story": "Five strands. Three hundred stones. One unbroken monsoon.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png",
            },
            {
                "id": "e-02",
                "name": "Panna Vine Choker",
                "material": "Zambian Emeralds • Polki",
                "story": "A vine of emeralds traced around the throat, set in matte gold.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png",
            },
            {
                "id": "e-03",
                "name": "Forest Drop Earrings",
                "material": "Emerald • Diamond • South Sea Pearl",
                "story": "Light catches and pools at the pearl — designed for candlelight, not flash.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png",
            },
        ],
    },
    {
        "slug": "bridal",
        "name": "The Bridal Constellation",
        "tagline": "Every bride is her own galaxy.",
        "mood": "Celestial. Tender. Inevitable.",
        "atmosphere": "starfield",
        "accent": "#F6EAE7",
        "story": "Heirloom bridal ensembles — built around the morning of the wedding, the moment of the tying of the mangalsutra, and the evening reception.",
        "pieces": [
            {
                "id": "b-01",
                "name": "Sankalpa Bridal Set",
                "material": "Polki • Uncut Diamond • Ruby • Pearl",
                "story": "Designed for the muhurtham — the moment of resolve.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png",
            },
            {
                "id": "b-02",
                "name": "Vaddanam Mangala",
                "material": "22kt Gold • Rubies • Pearls",
                "story": "A waist belt — heavy, ceremonial, generational.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png",
            },
            {
                "id": "b-03",
                "name": "Maang Tikka Surya",
                "material": "Diamond • Polki • Gold",
                "story": "Worn at the parting of the hair, like a small sun.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png",
            },
        ],
    },
    {
        "slug": "pearls",
        "name": "The House of Pearls",
        "tagline": "Hyderabad's oldest light.",
        "mood": "Moonlit. Feminine. Calm.",
        "atmosphere": "moonlight",
        "accent": "#E8E6F0",
        "story": "Strung from Basra and South Sea pearls — pieces designed for the quiet hours, for after the wedding has ended and the family stays.",
        "pieces": [
            {
                "id": "p-01",
                "name": "Basra Moonlight Haar",
                "material": "Natural Basra Pearls • Diamond Pendant",
                "story": "Seven strands graduated from rice to round.",
                "image": "https://static.prod-images.emergentagent.com/jobs/89bdb731-09ba-4714-b1da-795d63177d28/images/51930b813c8eac4657659e9d06af99896f4a4952dd218890c7b086a2cce1bd54.png",
            },
            {
                "id": "p-02",
                "name": "South Sea Drop Studs",
                "material": "South Sea Pearl • Diamond Halo",
                "story": "Worn equally well with a saree or a silk shirt.",
                "image": "https://static.prod-images.emergentagent.com/jobs/89bdb731-09ba-4714-b1da-795d63177d28/images/51930b813c8eac4657659e9d06af99896f4a4952dd218890c7b086a2cce1bd54.png",
            },
            {
                "id": "p-03",
                "name": "Pearl Vine Cuff",
                "material": "Keshi Pearls • 18kt Gold Vine",
                "story": "A river of pearls running along the wrist.",
                "image": "https://static.prod-images.emergentagent.com/jobs/89bdb731-09ba-4714-b1da-795d63177d28/images/51930b813c8eac4657659e9d06af99896f4a4952dd218890c7b086a2cce1bd54.png",
            },
        ],
    },
    {
        "slug": "modern",
        "name": "The Modern Aura",
        "tagline": "Heritage, distilled.",
        "mood": "Architectural. Quiet. Wearable.",
        "atmosphere": "minimal",
        "accent": "#A3A3A3",
        "story": "Contemporary silhouettes carrying ancestral language — for the woman who carries her culture lightly but never lightly held.",
        "pieces": [
            {
                "id": "m-01",
                "name": "Ruby Halo Cuff",
                "material": "Ruby • Diamond • 18kt Gold",
                "story": "A single bloom — designed for the everyday extraordinary.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png",
            },
            {
                "id": "m-02",
                "name": "Linear Diamond Choker",
                "material": "Round Brilliant Diamonds • Platinum",
                "story": "A single line of light around the throat.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png",
            },
            {
                "id": "m-03",
                "name": "Solitaire Aarambh",
                "material": "GIA Certified Solitaire • Platinum",
                "story": "The first jewel of a new chapter.",
                "image": "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png",
            },
        ],
    },
]


# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "SBJ — The House of Cinematic Heritage", "version": "1.0"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


# ----- Collections -----
@api_router.get("/collections")
async def list_collections():
    return [{"slug": c["slug"], "name": c["name"], "tagline": c["tagline"],
             "mood": c["mood"], "accent": c["accent"], "atmosphere": c["atmosphere"],
             "cover": c["pieces"][0]["image"]} for c in COLLECTIONS]


@api_router.get("/collections/{slug}")
async def get_collection(slug: str):
    for c in COLLECTIONS:
        if c["slug"] == slug:
            return c
    raise HTTPException(status_code=404, detail="Collection not found")


# ----- Lead capture -----
@api_router.post("/leads/consultation", response_model=ConsultationLead)
async def create_consultation(payload: ConsultationLeadCreate):
    lead = ConsultationLead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info(f"New bridal consultation lead: {lead.full_name} ({lead.phone})")
    return lead


@api_router.post("/leads/reservation", response_model=ReservationLead)
async def create_reservation(payload: ReservationLeadCreate):
    lead = ReservationLead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info(f"New private viewing reservation: {lead.full_name} ({lead.phone})")
    return lead


@api_router.post("/leads/concierge", response_model=ConciergeLead)
async def create_concierge(payload: ConciergeLeadCreate):
    lead = ConciergeLead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info(f"New concierge enquiry: {lead.full_name} ({lead.phone})")
    return lead


@api_router.get("/leads")
async def list_leads(type: Optional[str] = None):
    q = {}
    if type:
        q["type"] = type
    rows = await db.leads.find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


# Mount router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
