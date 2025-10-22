from app.database.connection import mongo

class Branch:
    collection = mongo.db.branches

    @staticmethod
    def find_all():
        return list(Branch.collection.find())

    @staticmethod
    def find_by_id(branch_id):
        from bson import ObjectId
        return Branch.collection.find_one({"_id": ObjectId(branch_id)})

    @staticmethod
    def create(data: dict):
        result = Branch.collection.insert_one(data)
        return Branch.collection.find_one({"_id": result.inserted_id})