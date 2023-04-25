const AuthModalInputs = ({ handleChange, isSignin }) => {
  return (
    <div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="border rounded px-2 py-3 w-[49%]"
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            name="first_name"
          />
          <input
            className="border rounded px-2 py-3 w-[49%]"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="last_name"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded px-2 py-3 w-full"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
      </div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="border rounded px-2 py-3 w-[49%]"
            type="text"
            placeholder="Phone"
            onChange={handleChange}
            name="phone"
          />
          <input
            className="border rounded px-2 py-3 w-[49%]"
            type="text"
            placeholder="City"
            onChange={handleChange}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded px-2 py-3 w-full"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
      </div>
    </div>
  );
};

export default AuthModalInputs;
