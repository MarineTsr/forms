import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const userSchema = yup.object({
    title: yup.string().nullable().required("Le champ est obligatoire"),
    type: yup.string().required("Le champ est obligatoire"),
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
    rgpd: yup
      .bool()
      .required("Le champ est obligatoire")
      .oneOf([true], "Vous devez approuver pour continuer"),
  });

  const defaultValues = {
    title: null,
    type: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirm: "",
    rgpd: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    // setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(userSchema),
  });

  const formSubmit = async (data, event) => {
    try {
      clearErrors(); // Must clear errors because they won't be deleted automatically if they are not linked to a specific field (ex: global errors)

      const response = await fetch("https://restapi.fr/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const results = await response.json();
        console.log(results);
        reset(defaultValues);
        // throw new Error("Ceci est une erreur de test");
      }
    } catch (err) {
      console.error(err);
      // setError("globalErr", {
      //   type: "globalErr",
      //   message: err.message,
      // });
    }
  };

  return (
    <div className="container my-5 px-5">
      <h1 className="title is-4">Gestion des formulaires</h1>
      <hr />
      <form
        className="columns is-multiline"
        onSubmit={handleSubmit(formSubmit)}
      >
        {errors?.globalErr && (
          <div className="column is-12">
            <article className="message is-danger">
              <div className="message-body">{errors.globalErr.message}</div>
            </article>
          </div>
        )}

        <div className="column is-6">
          <div className="field">
            <label className="label">Civilité</label>
            <div className="control">
              <label className="radio mr-4">
                <input
                  type="radio"
                  name="title"
                  value="m"
                  className="mr-1"
                  {...register("title")}
                />
                M.
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="title"
                  value="mme"
                  className="mr-1"
                  {...register("title")}
                />
                Mme.
              </label>
            </div>
            {errors?.title && (
              <p className="help is-danger">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div className="column is-6">
          <div className="field">
            <label htmlFor="type" className="label">
              Type de compte
            </label>
            <div className={`select${errors?.type ? " is-danger" : ""}`}>
              <select id="type" {...register("type")}>
                <option value="" disabled>
                  Choisissez un type de compte
                </option>
                <option value="pro">Professionnel</option>
                <option value="part">Particulier</option>
              </select>
            </div>
            {errors?.type && (
              <p className="help is-danger">{errors.type.message}</p>
            )}
          </div>
        </div>

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
          <div className="field">
            <label className="checkbox">
              <input
                type="checkbox"
                name="rgpd"
                className="mr-1"
                {...register("rgpd")}
              />
              J'accepte les conditions d'utilisation de ce service
            </label>
            {errors?.rgpd && (
              <p className="help is-danger">{errors.rgpd.message}</p>
            )}
          </div>
        </div>

        <div className="column is-12">
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button
                type="submit"
                className="button is-link"
                disabled={isSubmitting}
              >
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
