from fastapi import APIRouter, HTTPException, Header
from database import connection
from passlib.context import CryptContext
from typing import Optional

router = APIRouter(prefix="/auth")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


@router.post("/register")
def register(data: dict):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="User already exists")

    is_approved = 1 if data["role"] in ["patient", "insurance"] else 0

    cursor.execute(
        "INSERT INTO users (name,email,password,role,is_approved,is_active) VALUES (%s,%s,%s,%s,%s,%s)",
        (data["name"], data["email"], hash_password(data["password"]), data["role"], is_approved, 1)
    )
    user_id = cursor.lastrowid

    if data["role"] == "patient":
        cursor.execute(
            "INSERT INTO patients (user_id,full_name,age,gender,phone,address) VALUES (%s,%s,%s,%s,%s,%s)",
            (user_id, data["name"], data.get("age"), data.get("gender"), data.get("phone"), data.get("address"))
        )
    elif data["role"] == "doctor":
        cursor.execute(
            "INSERT INTO doctors (user_id,full_name,specialization,license_number,hospital_name,phone) VALUES (%s,%s,%s,%s,%s,%s)",
            (user_id, data["name"], data.get("specialization"), data.get("license"), data.get("hospital"), data.get("phone"))
        )
    elif data["role"] == "hospital":
        cursor.execute(
            "INSERT INTO hospitals (user_id,hospital_name,registration_number,address,contact_email,contact_phone) VALUES (%s,%s,%s,%s,%s,%s)",
            (user_id, data["name"], data.get("registrationNumber"), data.get("address"), data["email"], data.get("phone"))
        )
    elif data["role"] == "insurance":
        cursor.execute(
            "INSERT INTO insurances (user_id,company_name,license_number,contact_person,contact_phone) VALUES (%s,%s,%s,%s,%s)",
            (user_id, data["name"], data.get("license"), data.get("contactPerson"), data.get("phone"))
        )

    connection.commit()
    return {"success": True}


@router.post("/login")
def login(data: dict):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
    user = cursor.fetchone()

    if not user or not verify_password(data["password"], user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "success": True,
        "role": user["role"],
        "approved": bool(user["is_approved"])
    }


@router.post("/change-password")
def change_password(data: dict):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(data["currentPassword"], user["password"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect")
    
    cursor.execute("UPDATE users SET password=%s WHERE email=%s", (hash_password(data["newPassword"]), data["email"]))
    connection.commit()
    
    return {"success": True}
