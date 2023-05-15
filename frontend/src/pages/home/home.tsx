import { LoginWORPage } from "@pages/home";
export function HomePage({ socket }: any) {
  return (
    <>
      <section className="lg:section-min-height scroll-mt-40 tallscreen:section-min-height mb-12 flex flex-col-reverse justify-center gap-8 py-40 px-6 lg:flex-row">
        <article className="w-full lg:w-1/2 mt-15">
          <h2 className="max-w-md text-center text-2xl font-bold text-black dark:text-black sm:text-left sm:text-3xl">
            Free Online Chatting, Chat Online Without Registration
          </h2>
          <p className="mt-4 max-w-md text-center sm:text-left">
            Chatingar is an online free chat website. Here you can meet new
            friends from all over the world. No download, no setup & no
            registration needed. Please read chat rules:
          </p>
          <p className="bg-purple-500 mt-4 max-w-md text-center text-lg sm:text-left rounded-md p-2">
            No Spam :
            <span className=" px-2 text-sm text-white">
              Do not spam chat users with random or automated messages.
            </span>
          </p>
          <p className="bg-purple-500 mt-4 max-w-md text-center text-lg sm:text-left rounded-md p-2">
            No Provocation :
            <span className=" px-2 text-sm text-white">
              Do not attack or harass others because of their race, religion or
              anything that is personal.{" "}
            </span>
          </p>
          <p className="bg-purple-500 mt-4 max-w-md text-center text-lg sm:text-left rounded-md p-2">
            No Bad Links :
            <span className=" px-2 text-sm text-white">
              Do not send links to websites that are similar to Chattusa or
              websites that aren't authentic or look suspicious.{" "}
            </span>
          </p>
          <p className="bg-purple-500 mt-4 max-w-md text-center text-lg sm:text-left rounded-md p-2">
            No Sexual Harassment :
            <span className=" px-2 text-sm text-white">
              Do not attack or harass people of opposite gender and respect
              everyone online. Also we do not encourage sex-talk or any other
              practices here.{" "}
            </span>
          </p>
          <p className="bg-purple-500 mt-4 max-w-md text-center text-lg sm:text-left rounded-md p-2">
            Other rules :
            <span className=" px-2 text-sm text-white">
              Even if we didn't mention everything, any act that is considered a
              bad behavior will result in a permanent ban.
            </span>
          </p>
          {/* <div className="mt-4 max-w-md text-center text-sm  sm:text-left flex flex-row">
            <img
              className="w-20 h-20 pt-10"
              src="/icons/friendly.webp"
              alt="Rocket Dab"
            />
            <div className="p-5">
              <h2 className="text-3xl font-bold">Friendly</h2>
              <p className="mt-4 max-w-md text-center sm:text-left">
                Chatingar is an online free chat rooms. Here you can meet new
                friends from all over the world. No download, no setup & no
                registration needed.
              </p>
            </div>
          </div>
          <div className="mt-4 max-w-md text-center text-sm  sm:text-left flex flex-row">
            <img
              className="w-20 h-20 pt-10"
              src="/icons/mobile.webp"
              alt="Rocket Dab"
            />
            <div className="p-5">
              <h2 className="text-3xl font-bold">Anytime, Anywhere!</h2>
              <p className="mt-4 max-w-md text-center sm:text-left">
                Chatingar is an online free chat rooms. Here you can meet new
                friends from all over the world. No download, no setup & no
                registration needed.
              </p>
            </div>
          </div> */}
        </article>
        {/* <img className="w-1/2" src="./img/rocketdab.png" alt="Rocket Dab" /> */}
        <LoginWORPage />
      </section>
      <hr className="mx-auto w-1/2 bg-black dark:bg-white" />

      {/* <section className="widescreen:section-min-height scroll-mt-40 tallscreen:section-min-height mb-12 flex flex-col-reverse justify-center gap-8 py-40 px-6 sm:flex-row">
        <p className="text-center">
          Chatingar is a free chat room website where you can have live chat
          with single women and men, you can discuss with random strangers from
          USA, Canada, United Kingdom, Australia and people from all over the
          world, at the same time in multiple chatrooms and discussion groups,
          any time you can start a private conversation to meet girls and boys
          living nearby in your area.
        </p>
      </section> */}
      <section className="widescreen:section-min-height scroll-mt-40 tallscreen:section-min-height mb-12 flex flex-col-reverse justify-center gap-8 py-40 px-6 sm:flex-row">
        <p className="text-center">
          Welcome to Chatingar, the ultimate destination for free chat rooms.
          Engage in lively conversations with single men and women worldwide.
          Connect with random strangers from the USA, Canada, UK, Australia, and
          beyond in real-time. Immerse yourself in a vibrant community, explore
          chatrooms, and meet fascinating individuals in your area. Get ready
          for an exciting journey of connection and discovery.
        </p>
      </section>
    </>
  );
}
