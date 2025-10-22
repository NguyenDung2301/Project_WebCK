from bson import ObjectId

def to_objectid(id_str):
    """Chuyển chuỗi ID thành ObjectId MongoDB"""
    try:
        return ObjectId(id_str)
    except Exception:
        return None

def obj_to_str(doc):
    """Chuyển 1 document MongoDB sang JSON-friendly (ObjectId -> str)"""
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    for key, value in list(doc.items()):
        if isinstance(value, ObjectId):
            doc[key] = str(value)
    return doc

def list_objs_to_str(docs):
    """Chuyển nhiều document (list) sang dạng JSON-friendly"""
    return [obj_to_str(doc.copy()) for doc in docs]