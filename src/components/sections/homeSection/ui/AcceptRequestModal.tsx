import React, { useState, FC, ChangeEvent } from "react";
import { Button, Modal, Input, Checkbox, Empty, Drawer } from "antd";
import { useMediaQuery } from "react-responsive";

import styles from "../styles.module.sass";
import { SearchOutlined } from "@ant-design/icons";
interface partnerQuestion {
  question: string;
}

interface AcceptModalProps {
  isAcceptModalOpen: boolean;
  onAcceptShowModal: () => void;
  onAccept: () => void;
  OnAcceptCancel: () => void;
  interestText: string;
  setInterestText: (value: string) => void;
  onCheckboxChange: (value: string) => void;
  selectedCheckbox: string | null;
  acceptMeetings: partnerQuestion | null;
}

const AcceptRequestModal: FC<AcceptModalProps> = ({
  isAcceptModalOpen,
  onAcceptShowModal,
  onAccept,
  OnAcceptCancel,
  interestText,
  setInterestText,
  onCheckboxChange,
  selectedCheckbox,
  acceptMeetings,
}) => {
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 610 });
  const isSubmitDisabled = interestText.trim() === "";
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    onCheckboxChange(value); // Call a function from the props when the checkbox changes
  };

  return (
    <>
      {isMobile ? (
        <Drawer
          style={{ borderTopLeftRadius: "5%", borderTopRightRadius: "5%" }}
          placement={"bottom"}
          closeIcon={false}
          push={false}
          onClose={onAccept}
          open={isAcceptModalOpen}
        >
          <section className={styles.mobileRequestModalContainer}>
            <div className={styles.modalTitleContainer}>
              <h3>Request to meet</h3>
            </div>
            <small>
              {/* Please share why you would like to meet with this partner: */}
              {acceptMeetings?.question}
            </small>

            <div className={styles.mobileInputContainer}>
              {/* <small>Your thoughts</small>
              <Input
                bordered={false}
                placeholder={"Enter your thoughts here"}
                value={inputValue}
                onChange={handleInputChange}
              /> */}
              <Checkbox
                className={styles.reqCheck}
                checked={selectedCheckbox === "Yes"}
                onChange={() => handleCheckboxChange("Yes")}
              >
                Yes
              </Checkbox>
              <Checkbox
                className={styles.reqCheck}
                checked={selectedCheckbox === "No"}
                onChange={() => handleCheckboxChange("No")}
              >
                No
              </Checkbox>
            </div>

            <div className={styles.controlRequestContainer}>
              <button onClick={OnAcceptCancel} className={styles.cancelBtn}>
                Cancel
              </button>
              <button
                onClick={onAccept}
                className={styles.submitBtn}
                // disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
          </section>
        </Drawer>
      ) : (
        <Modal
          maskClosable={false}
          centered={true}
          width={"665px"}
          footer={null}
          closeIcon={false}
          open={isAcceptModalOpen}
          onOk={onAcceptShowModal}
          onCancel={onAccept}
        >
          <section className={styles.modalContainer}>
            <div className={styles.modalTitleContainer}>
              <h3>
                Please answer the following question before moving forward with
                this acceptance:
              </h3>
              <div className={styles.modalButtonsContainer}>
                <button
                  onClick={onAccept}
                  className={styles.declineSubBtn}
                  // disabled={isSubmitDisabled}
                >
                  Submit
                </button>
                <button onClick={OnAcceptCancel} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div>
            <small>
              {/* Please share why you would like to meet with this partner: */}
              {acceptMeetings?.question}
            </small>
            <div>
              <div className={styles.checkboxContainer}>
                {/* <Input
                  bordered={false}
                  placeholder={"Enter your thoughts here"}
                  value={interestText}
                  onChange={(e) => setInterestText(e.target.value)}
                /> */}
                <Checkbox
                  className={styles.reqCheck}
                  checked={selectedCheckbox === "Yes"}
                  onChange={() => handleCheckboxChange("Yes")}
                >
                  Yes
                </Checkbox>
                <Checkbox
                  className={styles.reqCheck}
                  checked={selectedCheckbox === "No"}
                  onChange={() => handleCheckboxChange("No")}
                >
                  No
                </Checkbox>
              </div>
            </div>
            <div>
           <small>Please note: if you answer "No", this meeting will be declined.</small></div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default AcceptRequestModal;
