import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, message, Modal } from "antd";
import { useParams } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";

import Header from "../../components/layout/Header";
import PartnersSection from "../../components/sections/homeSection/PartnersSection";
import MatchesSection from "../../components/sections/homeSection/MatchesSection";
import OverviewSection from "../../components/sections/homeSection/OverviewSection";
import MobileHomeSections from "../../components/sections/homeSection/mobile";
import {
  IncentivesProvider,
  PartnerContextProvider,
} from "../../components/sections/homeSection/contexts/IncentivesContext";
import styles from "./styles.module.sass";
import { getMemberInfoFromContact } from "../../getSalesForceData";

interface ContactInfo {
  Id: string;
  Member__c: string;
  Points_Balance__c: string;
  Pending_Points__c: string;
  Member_Survey_Link__c: string;
  Non_Profit_Top_Choice__c?: string;
  Charity_Name__c?: string;
  MailingStreet?: string;
  MailingCity?: string;
  MailingState?: string;
  MailingPostalCode?: string;
  MailingCountry?: string;
  Mailing_Address_Verified_Date__c?: string;
  AccountId: string;
  Partner_Referral_Link__c: string;
  Shortened_PR_Link__c: string;
  Email: string;
}
const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { clientId } = useParams<{ clientId: string }>();

  const isMobile = useMediaQuery({ maxWidth: 610 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (!isMobile && !isTablet && !clientId) {
      setIsModalOpen(true);
    }
    const getContactData = async () => {
      try {
        const memberId = await getMemberInfoFromContact(`${clientId}`);
        setContactData(memberId);
      } catch (error) {
        console.error("Error fetching partner details:", error);
      }
    };
    getContactData();
  }, [clientId, isMobile, isTablet]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    // alert("Link copied to clipboard!");
    messageApi.info("Link copied!");
  };

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      <Modal
        // title="Basic Modal"
        maskClosable={true}
        centered={true}
        width={"665px"}
        footer={null}
        style={{
          height: "75vh",
          overflow: "auto",
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contextHolder}
        {contactData && (
          <section>
            <div>
              <h3>Refer a new partner: 5,000 Points</h3>
              <ol>
                <li>
                  Refer a vendor who is not a DoGood partner by sharing this
                  link:&nbsp;
                  <span>
                    <a
                      href={contactData.Shortened_PR_Link__c}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Vendor Referral Link
                    </a>{" "}
                    <Button
                      type="text"
                      onClick={() =>
                        copyToClipboard(contactData.Shortened_PR_Link__c)
                      }
                      icon={<CopyOutlined />}
                    ></Button>
                  </span>
                </li>
                <li>
                  If the vendor signs up as a new DoGood Partner, you will earn
                  5,000 points.
                </li>
              </ol>
              <p>
                Many of our members will share their meeting request link with
                vendors, who cold-email them and request that they ask to meet
                via DoGood.
              </p>
            </div>
            <div>
              <h3>Refer a new member: 1,000 Points</h3>
              <ol>
                <li>
                  Refer a new member to DoGood using this link:{" "}
                  <span>
                    <a
                      href="https://join.mydogood.com/refer-a-member/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Member Referral Link
                    </a>{" "}
                    <Button
                      type="text"
                      onClick={() =>
                        copyToClipboard(
                          "https://join.mydogood.com/refer-a-member/"
                        )
                      }
                      icon={<CopyOutlined />}
                    ></Button>
                  </span>
                </li>
                <li>
                  The member must meet the following criteria:
                  <ol type="a">
                    <li>Director Level+</li>
                    <li>IT, IT Security, Marketing, or HR leader</li>
                    <li>
                      Organization must have 1,000+ employees or $100M+ revenue
                    </li>
                  </ol>
                </li>
                <li>
                  After the member completes their first meeting, you will earn
                  1,000 points.{" "}
                </li>
              </ol>
            </div>
            <div>
              <h3>Record a video testimonial: 500 points</h3>
              <ol>
                <li>
                  Click&nbsp;
                  <a
                    href="https://vocalvideo.com/c/dogood"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>{" "}
                  and record a video testimonial. Earn 500 points.
                </li>
              </ol>
              <p>
                *Members are limited to receiving points for this action once
                every 12 months
              </p>
            </div>
            <div>
              <h3>Post your referral links on LinkedIn: 250 points</h3>
              <ol>
                <li>
                  Post the below message on LinkedIn (you may edit the copy as
                  needed)
                </li>
                <li>
                  Send us a link to the post or share a screenshot. Earn 250
                  points.{" "}
                </li>
              </ol>
              <p>
                *Members are limited to receiving points for this action once
                every 3 months
              </p>
            </div>
            <div>
              <ul>
                <li>
                  Do you struggle to find ways to give back to the community
                  besides simply monetary donations?
                </li>
                <li>
                  Does your team get annoyed when you meet with vendors that are
                  selling something new or innovative and drag them into
                  considering alternative approaches that slow them down?
                </li>
                <li>
                  If both of these things are true, consider joining this DoGood
                  organization. They will send you a list of potential vendors
                  to meet with, and you can simply peruse the list periodically
                  with no pressure until you find one that interests you.
                </li>
                <li>
                  Spend 30 minutes with them and they will donate to your
                  favorite charity.
                </li>
                <li>
                  If you are an IT, Marketing, or HR decision maker in your
                  organization and decide to signup, please consider listing me
                  ({contactData.Email}) as a referral and they will make an
                  additional $25 donation to my favorite charity.
                </li>
                <li>
                  Learn more here:{" "}
                  <span>
                    <a
                      href="https://join.mydogood.com/refer-a-member/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      join.mydogood.com/refer-a-member
                    </a>{" "}
                  </span>
                </li>
              </ul>
            </div>
          </section>
        )}
      </Modal>

      <Header />

      {isMobile ? (
        <MobileHomeSections />
      ) : (
        <div className={styles.mainContainer}>
          <PartnersSection />
          <OverviewSection showModal={showModal} />
          <MatchesSection />
        </div>
      )}
    </main>
  );
};

export default Home;
