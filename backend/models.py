from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class GenerateRequest(BaseModel):
    idea: str
    industry: Optional[str] = None
    target_audience: Optional[str] = None


class StartupBlueprint(BaseModel):
    startup_name: str
    elevator_pitch: str
    problem: str
    solution: str
    core_features: List[str]
    target_users: List[str]
    use_cases: List[str]
    ui_ux_flow: List[str]
    backend_architecture: str
    sample_api_endpoints: List[dict]
    tech_stack: dict
    deployment_suggestion: str


class SaveRequest(BaseModel):
    idea: str
    blueprint: StartupBlueprint


class IdeaRecord(BaseModel):
    id: int
    idea: str
    startup_name: str
    elevator_pitch: str
    created_at: str
    blueprint_json: str

    class Config:
        from_attributes = True
