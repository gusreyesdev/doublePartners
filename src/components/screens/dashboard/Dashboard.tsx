import { useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import { useLazyGetUsersQuery } from "../../../services";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [userData, setuserData] = useState([]);

  const [getUsers, { isLoading, isSuccess }] = useLazyGetUsersQuery();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    if (!validator.isLength(formData.name, { min: 4 })) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "La longitud del nombre no es valido",
      });

      return false;
    } else if (validator.equals(formData.name, "doublevpartners")) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Nombre no es valido",
      });

      return false;
    }

    return true;
  };

  const searchSubmit = async (event: any) => {
    event.preventDefault();

    if (isFormValid()) {
      const data = await getUsers(formData.name).unwrap();
      setuserData(data.items);
    }
  };

  return (
    <>
      <form onSubmit={searchSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Ingresar Nombre</label>
        </div>

        <div className="d-grid ">
          <button className="btn btn-primary" onClick={searchSubmit}>
            Buscar
          </button>
        </div>
      </form>

      <div>
        <ul className="list-group">
          {isLoading === false && userData.length > 0 ? (
            <div>
              <div className="row">
                <div className="col">Id</div>

                <div className="col">Login</div>
              </div>

              {userData.map((user: any) => (
                <li className="list-group-item" key={user.id}>
                  <Link
                    style={{ fontWeight: "normal", color: "black" }}
                    to={`/details/${user.login}`}
                  >
                    <div className="row" key={user.id}>
                      <div className="col">
                        <span> {user.id} </span>
                      </div>

                      <div className="col text-break">
                        <span> {user.login} </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          ) : (
            <div>
              {isSuccess === true && userData.length === 0 && (
                <span>No se encontro usuarios</span>
              )}
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
