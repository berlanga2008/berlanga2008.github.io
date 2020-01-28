import React from "react"



const wordpressClasses = [
    "wp-block-code",
    "prettyprint",
    "linenums",
    "inline:true",
    "decode:1",
    "pre-scrollable",
    "lang:default",
  ]
 
  
  export const PostContent = ({theContent}) => (
    <div>{theContent}   
     </div>  
  );