import { useEffect } from "react";

const ModalContent = ({ setModalTitle }: any) => {
  useEffect(() => {
    setModalTitle?.("This an updated modal title");
  }, []);

  return <>Hello</>;
};

export default ModalContent;
