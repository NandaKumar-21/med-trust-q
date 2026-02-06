from fastapi import APIRouter, HTTPException, Header
from database import connection
from typing import Optional

router = APIRouter(prefix="/profile")


@router.get("/me")
def get_profile(user_email: Optional[str] = Header(None, alias="user-email")):
    if not user_email:
        raise HTTPException(status_code=400, detail="User email required")
    
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (user_email,))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.pop("password", None)
    
    if user["role"] == "patient":
        cursor.execute("SELECT * FROM patients WHERE user_id=%s", (user["id"],))
        details = cursor.fetchone()
        if details:
            user.update(details)
    elif user["role"] == "doctor":
        cursor.execute("SELECT * FROM doctors WHERE user_id=%s", (user["id"],))
        details = cursor.fetchone()
        if details:
            user.update(details)
    elif user["role"] == "hospital":
        cursor.execute("SELECT * FROM hospitals WHERE user_id=%s", (user["id"],))
        details = cursor.fetchone()
        if details:
            user.update(details)
    elif user["role"] == "insurance":
        cursor.execute("SELECT * FROM insurances WHERE user_id=%s", (user["id"],))
        details = cursor.fetchone()
        if details:
            user.update(details)
    
    return user
