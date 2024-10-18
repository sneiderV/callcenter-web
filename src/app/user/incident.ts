export class Incident {
    id !: number;
    userId: string;
    subject: string;
    description: string;
    status: string;
    originType: string;
    solution: string;
    creationDate: Date;
    updateDate: Date;
    
    constructor(userId: string, subject: string, description: string, status: string, originType: string, solution: string, creationDate: Date, updateDate: Date) {
        this.userId = userId;
        this.subject = subject;
        this.description = description;
        this.status = status;
        this.originType = originType;
        this.solution = solution;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
    }
    
}
