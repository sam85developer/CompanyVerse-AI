from app.agents.base import CompanyVerseAgent

class ProjectManagerAgent(CompanyVerseAgent):
    """
    Project Manager Agent: Operations Lead.
    Responsible for workflow orchestration, task prioritization, Gantt timeline scheduling,
    and bridging deliverables across CTO, Finance, Legal, and Marketing agent tracks.
    """
    def __init__(self):
        super().__init__(
            name="Project Manager Agent",
            role="Operations & Project Management Lead",
            instruction=(
                "You are the Project Manager of a startup. Your job is to compile and format "
                "the cross-functional team milestones into a logical operational schedule. "
                "Ensure dependencies are mapped out, risks are flagged, and execution sprint plans are ready."
            ),
            model="gemini-2.5-flash"
        )
