import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Chart } from "react-google-charts";

import { useGetUserQuery, useSaveUserMutation } from "../../../services";

export const UserDetails = () => {
  const { login } = useParams();

  const { data, isLoading } = useGetUserQuery(login!);

  const [saveUser] = useSaveUserMutation();

  let dataChar: any;

  if (isLoading === false) {
    dataChar = [
      [
        "User",
        "Followers",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
      [data.login, data.followers, "#b87333", null],
    ];
  }

  const options = {
    title: "Followers Number",
    width: 300,
    height: 200,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  const handleSaveUser = async () => {
    const user = {
      id: data.id,
      bio: data.bio,
      email: data.email,
      login: data.login,
      name: data.name,
    };

    try {
      await saveUser(user).unwrap();

      Swal.fire({
        icon: "success",
        title: "Informacion",
        text: "El usuario ha sido guardado",
      });
    } catch (error: any) {
      if (error) {

        if (error.data.errors) {
          Swal.fire({
            icon: "error",
            title: "Advertencia",
            text: "La informacion del usuario es incompleta",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Advertencia",
            text: "El usuario ya se ha registrado",
          });
        }
      }
    }
  };

  return (
    <div>
      {isLoading === false && (
        <div>
          <h1>{data.name}</h1>

          <img src={data.avatar_url} alt="avatar" width={200} height={200} />

          <h6>Bio</h6>
          <span>{data.bio}</span>

          <div>
            <Chart
              style={{ display: "flex", justifyContent: "center" }}
              chartType="BarChart"
              width="100%"
              height="200px"
              data={dataChar}
              options={options}
            />
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2"
              onClick={handleSaveUser}
            >
              Exportar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
