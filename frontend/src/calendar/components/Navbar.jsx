import  {useAuthStore}  from "../../hooks/useAuthStore"

const Navbar = () => {

  const{startLogout, user}= useAuthStore() 

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand text-white">
            &nbsp;
            Miguel</span>


        <button className="btn btn-danger text-white"
               onClick={startLogout}>
            <span>Salir</span>
        </button>

        </div>
  )
}

export default Navbar