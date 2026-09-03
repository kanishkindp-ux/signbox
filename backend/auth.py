import bcrypt

def hash_password(password: str) -> str:
    #hashes the password combined with the salting, convert python string into bytes
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    #converts the resulting hash back into string for storing in String database column
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
