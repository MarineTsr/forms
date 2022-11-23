import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  const formSubmit = (data, event) => {
    console.log(data, event);
  };

  return (
    <div className="container my-5 px-5">
      <h1 className="title is-4">Gestion des formulaires</h1>
      <hr />
      <form
        className="columns is-multiline"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="column is-6">
          <div className="field">
            <label htmlFor="lastname" className="label">
              Nom
            </label>
            <div className="control">
              <input
                className={`input${errors?.lastname ? " is-danger" : ""}`}
                id="lastname"
                type="text"
                {...register("lastname", {
                  minLength: {
                    value: 2,
                    message: "Le nom est trop court",
                  },
                  required: {
                    value: true,
                    message: "Ce champ est requis",
                  },
                })}
              />
            </div>
            {errors?.lastname && (
              <p className="help is-danger">{errors.lastname.message}</p>
            )}
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label htmlFor="firstname" className="label">
              Prénom
            </label>
            <div className="control">
              <input
                className={`input${errors?.firstname ? " is-danger" : ""}`}
                id="firstname"
                type="text"
                {...register("firstname", {
                  minLength: {
                    value: 2,
                    message: "Le prénom est trop court",
                  },
                })}
              />
            </div>
            {errors?.firstname && (
              <p className="help is-danger">{errors.firstname.message}</p>
            )}
          </div>
        </div>

        <div className="column is-12">
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button type="submit" className="button is-link">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
