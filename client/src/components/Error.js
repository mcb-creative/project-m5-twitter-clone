import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const Error = () => {
  return (
    <div>
      <FaBomb size={36} />
      <h1>An unknown error has occurred.</h1>
      <p>
        Please try refreshing the page, or contact support if the problem
        persists.
      </p>
    </div>
  );
};

export default Error;
