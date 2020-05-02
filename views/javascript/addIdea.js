var callback = function(){
    document.getElementById('btn').addEventListener('click',()=>{
        var text = swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Title",
              type: "text",
            },
          },
        }).then(text=>{
            if(text!=='' || typeof text !== 'undefined'){
                document.getElementById('name').value = text;
                document.getElementById('hidden').submit()
            }else{
                swal({
                    icon: "error",
                  });
            }
        })
      })
  };
  
  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }


