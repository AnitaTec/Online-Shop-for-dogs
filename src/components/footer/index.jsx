import styles from "./footer.module.css";

import InstagramIcon from "../../assets/icons/instagram.svg";
import WhatsappIcon from "../../assets/icons/whatsapp.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.content}>
          <div className={styles.leftBlock}>
            <div className={styles.phoneBlock}>
              <span className={styles.label}>Phone</span>
              +49 30 915-88492
            </div>

            <div className={styles.addressBlock}>
              <span className={styles.label}>Address</span>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.socialsBlock}>
              <span className={styles.label}>Socials</span>
              <div className={styles.social}>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={InstagramIcon} alt="Instagram" />
                </a>
                <a
                  href="https://wa.me/49123456789"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={WhatsappIcon} alt="WhatsApp" />
                </a>
              </div>
            </div>

            <div className={styles.workingHoursBlock}>
              <span className={styles.label}>Working Hours</span>
              24 hours a day
            </div>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            title="shop-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.523912345!2d13.3879143158323!3d52.52064507981161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851f0f0f0f0f0%3A0xabcdef123456!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Deutschland!5e0!3m2!1sen!2sde!4v1693981234567!5m2!1sen!2sde"
            width="1360"
            height="350"
            style={{ border: 0, borderRadius: "5px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
