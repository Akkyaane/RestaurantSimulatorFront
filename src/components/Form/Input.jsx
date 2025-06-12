import PropTypes from 'prop-types';

const Input = ({ type, name, title, value, onChange }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name}>{title}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required
                autoComplete={name}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;