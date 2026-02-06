from fastapi import APIRouter, HTTPException
from database import connection

router = APIRouter(prefix="/admin")


@router.get("/pending-users")
def get_pending_users():
    cursor = connection.cursor()
    cursor.execute("SELECT id,name,email,role,created_at FROM users WHERE is_approved=0")
    pending = cursor.fetchall()
    
    cursor.execute("SELECT id,name,email,role,created_at FROM users WHERE is_approved=1")
    approved = cursor.fetchall()
    
    return {"pending": pending, "approved": approved}


@router.post("/approve-user")
def approve_user(data: dict):
    user_id = data.get("userId")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID required")
    
    cursor = connection.cursor()
    cursor.execute("UPDATE users SET is_approved=1 WHERE id=%s", (user_id,))
    
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    connection.commit()
    return {"success": True}
