const InputForm = (props) => {
    const { onSubmit, onChangeName, onChangeNumber, inputValueName, inputValueNumber } = props
    return (
      <form onSubmit={onSubmit}>
          <div>
            name: <input 
            value={inputValueName}
            onChange={onChangeName} />
          </div>
          <div>
            number: <input 
            value={inputValueNumber}
            onChange={onChangeNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default InputForm