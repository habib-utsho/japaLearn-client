import { Link, useLocation } from "react-router-dom";
import carIcon from "../../assets/img/carIcon.png";
import pageBanner from "../../assets/img/pageBanner.jpg";
import MyMotion from "./MyMotion";

type TLink = {
  label: string;
  link: string;
};

const CommonPageBanner = ({
  title,
  links = [],
}: {
  title: string;
  links: TLink[];
}) => {
  const { pathname } = useLocation();
  return (
    <div
      // bg-gradient-to-b
      // from-slate-400
      // to-slate-300
      className="h-[220px] md:h-[350px] flex flex-col items-center justify-center gap-1 relative bg-center bg-no-repeat bg-slate-700 bg-blend-overlay"
      style={{ backgroundImage: `url("${pageBanner}")` }}
    >
      <ul className="flex items-center gap-2 md:gap-3 pt-[50px]">
        {[
          links?.map((elem, ind) => {
            const isActiveLink = pathname === elem.link;
            return (
              <Link
                key={ind}
                className={`inline-flex items-center gap-1 ${
                  isActiveLink
                    ? "text-primary font-semibold"
                    : "text-slate-100 font-normal"
                }`}
                to={elem?.link}
              >
                {isActiveLink && (
                  <span className="h-2 w-2 rounded-full bg-primary inline-block"></span>
                )}{" "}
                {elem?.label}
              </Link>
            );
          }),
        ]}
      </ul>
      <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-white">
        {title}
      </h2>

      {/* Message icon */}
      <div className="absolute -bottom-1 left-7 md:left-10">
        <MyMotion y={-30}>
          <img
            src={carIcon}
            alt="message icon"
            className="h-14 md:h-16 w-14 md:w-16"
          />
        </MyMotion>
      </div>
    </div>
  );
};

export default CommonPageBanner;
