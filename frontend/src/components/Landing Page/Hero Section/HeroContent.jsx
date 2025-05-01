import Badge from "./Badge";
import Button from "./Button";

const HeroContent = () => {
  return (
    <section className="flex flex-wrap justify-between items-start px-16 py-20 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col flex-1 self-stretch my-auto max-w-[674px] min-w-60 max-md:max-w-full">
        <Badge icon="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/dc8b5305192bf00b6bd514cf78bc758a03f3abbb?placeholderIfAbsent=true">
          Rated #1 choice for healthcare appointments by users
        </Badge>

        <div className="flex flex-col mt-10 w-full max-md:max-w-full">
          <div className="w-full">
            <h1 className="text-7xl font-medium tracking-tighter leading-[120px] text-neutral-900 max-md:max-w-full max-md:text-4xl max-md:leading-[67px]">
              <span
                style={{
                  fontFamily:
                    "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Connecting You{" "}
              </span>
              <span
                style={{
                  fontFamily:
                    "Cambon, -apple-system, Roboto, Helvetica, sans-serif",
                  fontStyle: "italic",
                  color: "rgba(0,126,133,1)",
                }}
              >
                to
              </span>{" "}
              <br />
              <span
                style={{
                  fontFamily:
                    "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Better Health
              </span>
            </h1>
            <p className="mt-4 text-2xl tracking-tight leading-10 text-zinc-500 max-md:max-w-full max-md:text-lg">
              We're here to link you directly to improved health outcomes,
              effortlessly connecting you with the care you need.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center self-start mt-16 text-xl font-medium tracking-tight leading-9 max-md:mt-10 max-md:max-w-full">
            <Button variant="primary" className="max-md:w-full">
              Book Consultation
            </Button>
            <Button variant="secondary" className="max-md:w-full">
              Learn More
              <img
                src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/e50007e55049c485b9a337469db87e7b35732feb?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt="Learn More Icon"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-[646px] max-w-full pl-8 max-md:pl-0 max-md:mt-10">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/387f48495a14da5573919d24ef65bc47d6dbae18?placeholderIfAbsent=true"
          className="object-contain w-full h-auto rounded-none aspect-[1.06]"
          alt="Healthcare Illustration"
        />
      </div>
    </section>
  );
};

export default HeroContent;
