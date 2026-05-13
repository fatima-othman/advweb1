import { useState } from 'react';

const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  placeholder,
  hint,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field-wrap">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className={`password-input-wrap${error ? ' has-error' : ''}`}>
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          className="input password-input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {hint ? <p className="form-hint">{hint}</p> : null}
      {error ? <p id={`${id}-error`} className="form-error">{error}</p> : null}
    </div>
  );
};

export default PasswordField;
