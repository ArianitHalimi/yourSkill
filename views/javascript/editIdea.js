var callback = function(){
    var success = async () => {
        var thisfunc = () => {
            swal({
                icon: "success",
            });
        }
        var data = await thisfunc()
    }
    document.getElementById('edit').addEventListener('click',()=>{
        document.getElementById('submit').submit()
    })
    document.getElementById('delete').addEventListener('click',()=>{
        success()
        document.getElementById('deleteSubmit').submit()
    })
};
  
if(
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
){callback();} 
else {
    document.addEventListener("DOMContentLoaded", callback);
  }
