const InputForm = (props) => {
    const { title, onSubmit, onChange, inputValue } = props
    return (
      <form onSubmit={onSubmit}>
          <div>
            {title}: <input 
            value={inputValue}
            onChange={onChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default InputForm