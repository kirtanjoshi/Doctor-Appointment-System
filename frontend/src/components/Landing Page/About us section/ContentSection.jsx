import StatisticItem from "./StatisticItem";
import RatingBadge from "./RatingBadge";

const ContentSection = () => {
  return (
    <section className="flex flex-col flex-1 shrink my-auto basis-0 min-w-60 max-md:max-w-full">
      <RatingBadge
        icon="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/3e1f20fa92e810b56d4d9015e105a5bd6810e2b7?placeholderIfAbsent=true"
        text="Rated #1 for appointments with many professional doctors"
      />

      <div className="mt-10 w-full max-md:max-w-full">
        <h2 className="text-3xl font-medium tracking-tighter leading-10 text-neutral-900 max-md:max-w-full">
          We're revolutionizing healthcare with seamless access to trusted
          professionals, prioritizing your journey to better health.
        </h2>

        <div className="flex flex-wrap gap-10 justify-between items-start mt-10 w-full max-md:max-w-full">
          <StatisticItem value="40+" label="Dedicated Doctors" />
          <StatisticItem value="10K+" label="Hours of Patient Consultations" />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
