import {formaterror}from "./formaterror"
export default function(error:Error){
let reason = String(error).split("\n").join("")
let stack=formaterror(error)
        
                return {stack,error:reason,type: "error"}
                            
                                            
                                                                
                                                                                        
                                                                                                                     
                                                                                                                      
}