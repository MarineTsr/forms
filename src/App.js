import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const userSchema = yup.object({
    lastname: yup
      .string()
      .required("Le champ est obligatoire")
      .min(1, "Le champ doit faire au moins 1 caractère")
      .test("random", "C'est un non !", async () => {
        try {
          const response = await fetch("https://yesno.wtf/api");

          if (response.ok) {
            const result = await response.json();
            return result.answer === "yes";
          }
        } catch (err) {
          console.log(err);
        }
      }),
    firstname: yup.string().min(1, "Le champ doit faire au moins 1 caractère"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(8, "Le champ doit faire au moins 8 caractères"),
    passwordConfirm: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passes ne sont pas identiques"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(userSchema),
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
                {...register("lastname")}
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
                {...register("firstname")}
              />
            </div>
            {errors?.firstname && (
              <p className="help is-danger">{errors.firstname.message}</p>
            )}
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label htmlFor="password" className="label">
              Mot de passe
            </label>
            <div className="control">
              <input
                className={`input${errors?.password ? " is-danger" : ""}`}
                id="password"
                type="password"
                {...register("password")}
              />
            </div>
            {errors?.password && (
              <p className="help is-danger">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label htmlFor="passwordConfirm" className="label">
              Confirmation du mot de passe
            </label>
            <div className="control">
              <input
                className={`input${
                  errors?.passwordConfirm ? " is-danger" : ""
                }`}
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm")}
              />
            </div>
            {errors?.passwordConfirm && (
              <p className="help is-danger">{errors.passwordConfirm.message}</p>
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
