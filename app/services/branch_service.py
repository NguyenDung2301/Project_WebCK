from app.database.models.branch import Branch
from app.schemas.branch_schema import BranchSchema
from bson import ObjectId

class BranchService:
    
    @staticmethod
    def get_all_branches():
        raw_branches = Branch.find_all()
        return BranchService._list_branches_to_response(raw_branches)
    
    @staticmethod
    def get_branch_by_id(branch_id: str):
        branch = Branch.find_by_id(branch_id)
        return BranchService._branch_to_response(branch)
    
    @staticmethod
    def create_branch(data: dict):
        # Validate required fields
        required_fields = ['BranchName', 'Address', 'Hotline', 'OpenTime', 'CloseTime', 'MapLink']
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing required field: {field}")
        
        branch = Branch.create(data)
        return BranchService._branch_to_response(branch)
    
    @staticmethod
    def _branch_to_response(branch):
        if not branch:
            return None
        branch['_id'] = str(branch['_id'])
        return branch
    
    @staticmethod
    def _list_branches_to_response(branches):
        return [BranchService._branch_to_response(branch) for branch in branches]