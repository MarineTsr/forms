import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, getValues, watch } = useForm();

  watch();

  const formSubmit = (values) => {
    console.log(values);
  };

  console.log(getValues());

  return (
    <div className="container my-5 px-5">
      <h1 className="title is-4">Gestion des formulaires</h1>
      <hr />
      <form className="columns" onSubmit={handleSubmit(formSubmit)}>
        <div className="column is-6 is-offset-3">
          <div className="field">
            <label htmlFor="lastname" className="label">
              Nom
            </label>
            <div className="control">
              <input
                className="input"
                id="lastname"
                type="text"
                {...register("lastname")}
              />
            </div>
          </div>

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
