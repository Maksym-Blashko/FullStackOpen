const FilterField = (props) => {
    const { onChange, onClear, inputValue } = props
    return (
        <form onSubmit={onClear}>
            <div>
                filter shown with: <input
                    value={inputValue}
                    onChange={onChange} />
                <button type="submit">X</button>
            </div>
        </form>
    )
}

export default FilterField