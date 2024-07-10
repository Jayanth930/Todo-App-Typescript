export interface Todo{
    id : string,
    name : string ,
    completed : boolean ,
    createdAt : Date ,
    updatedAt : Date
}

export interface successResponse{
    responseCode : 1 
    message : string
    data : Todo[] | Todo
}

export interface failureResponse {
    responseCode : 0 ,
    message : string
}


export interface UpdateDto{
    id : string 
    newname? : string
}

export interface ModelParams {
    id : null | string ,
    show : boolean 
 }


export function isSuccess(object : successResponse | failureResponse) : object is successResponse{
    return "data" in object
}