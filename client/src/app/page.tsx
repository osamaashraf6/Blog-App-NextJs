import Category from "@/components/Category"
import CategoryLayout from "@/components/CategoryLayout"
import Landing from "@/components/Landing"
import Popular from "@/components/Popular"
import Recent from "@/components/Recent"

function Home() {
  return (
    <>
      <Landing />
      <Category />
      <section className="py-8">
        <div className="container">
          <div className="items flex flex-col md:flex-row gap-12">
            <Recent />
            <div className="item flex flex-col gap-12 md:w-[25%]">
              <Popular />
              <CategoryLayout />
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Home
