"""Backend API tests for SBJ — House of Cinematic Heritage."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://heritage-luxury-11.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ----- Root -----
class TestRoot:
    def test_root_welcome(self, s):
        r = s.get(f"{API}/")
        assert r.status_code == 200
        d = r.json()
        assert "SBJ" in d.get("message", "")
        assert "version" in d


# ----- Collections -----
class TestCollections:
    def test_list_collections(self, s):
        r = s.get(f"{API}/collections")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 5
        slugs = {c["slug"] for c in data}
        assert slugs == {"temple", "emerald", "bridal", "pearls", "modern"}
        for c in data:
            for k in ("slug", "name", "tagline", "cover"):
                assert k in c, f"missing {k} in {c}"

    def test_get_temple_collection(self, s):
        r = s.get(f"{API}/collections/temple")
        assert r.status_code == 200
        c = r.json()
        assert c["slug"] == "temple"
        assert c["name"] == "The Temple of Heritage"
        assert isinstance(c["pieces"], list)
        assert len(c["pieces"]) == 3
        for p in c["pieces"]:
            for k in ("id", "name", "material", "story", "image"):
                assert k in p

    @pytest.mark.parametrize("slug", ["emerald", "bridal", "pearls", "modern"])
    def test_other_collections(self, s, slug):
        r = s.get(f"{API}/collections/{slug}")
        assert r.status_code == 200
        c = r.json()
        assert c["slug"] == slug
        assert len(c["pieces"]) == 3

    def test_nonexistent_collection_404(self, s):
        r = s.get(f"{API}/collections/nonexistent")
        assert r.status_code == 404


# ----- Leads -----
class TestLeads:
    def test_consultation_lead(self, s):
        payload = {
            "full_name": "TEST_Anjali Rao",
            "phone": "+919999988888",
            "wedding_month": "2026-12",
            "aesthetic": "traditional",
            "jewellery_focus": "bridal-set",
            "is_nri": True,
        }
        r = s.post(f"{API}/leads/consultation", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["full_name"] == payload["full_name"]
        assert d["phone"] == payload["phone"]
        assert d["aesthetic"] == "traditional"
        assert d["is_nri"] is True
        assert d["type"] == "consultation"
        assert "id" in d and len(d["id"]) > 0
        assert "created_at" in d

    def test_reservation_lead(self, s):
        payload = {
            "full_name": "TEST_Reservation User",
            "phone": "9030895440",
            "preferred_date": "2026-02-14",
            "preferred_time": "18:00",
            "party_size": 3,
            "collection_interest": "emerald",
        }
        r = s.post(f"{API}/leads/reservation", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["full_name"] == payload["full_name"]
        assert d["party_size"] == 3
        assert d["collection_interest"] == "emerald"
        assert d["type"] == "reservation"

    def test_concierge_lead(self, s):
        payload = {
            "full_name": "TEST_Concierge User",
            "phone": "9030895440",
            "message": "Looking for a pearl set",
        }
        r = s.post(f"{API}/leads/concierge", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["full_name"] == payload["full_name"]
        assert d["message"] == payload["message"]
        assert d["type"] == "concierge"

    def test_consultation_validation_missing_phone(self, s):
        r = s.post(f"{API}/leads/consultation", json={"full_name": "X"})
        assert r.status_code == 422

    def test_list_leads_all(self, s):
        r = s.get(f"{API}/leads")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 3
        # Should be sorted descending by created_at
        if len(rows) >= 2:
            assert rows[0]["created_at"] >= rows[-1]["created_at"]
        # ensure no _id leaks
        for row in rows:
            assert "_id" not in row

    def test_list_leads_filter_consultation(self, s):
        r = s.get(f"{API}/leads", params={"type": "consultation"})
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 1
        for row in rows:
            assert row["type"] == "consultation"

    def test_list_leads_filter_reservation(self, s):
        r = s.get(f"{API}/leads", params={"type": "reservation"})
        assert r.status_code == 200
        for row in r.json():
            assert row["type"] == "reservation"
