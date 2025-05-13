
import Head from 'next/head'
import { useState } from 'react'

const denverData = {
  city: "Denver",
  attractions: [
    { name: "Red Rocks Amphitheatre", link: "https://www.redrocksonline.com/", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Red_Rocks_Amphitheatre_2022.jpg" },
    { name: "Denver Art Museum", link: "https://denverartmuseum.org/", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Denver_Art_Museum_Exterior_2011.jpg" },
    { name: "Union Station", link: "https://unionstationindenver.com/", image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Denver_Union_Station%2C_August_2014.jpg" },
    { name: "Denver Botanic Gardens", link: "https://www.botanicgardens.org/", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Denver_Botanic_Gardens.JPG" }
  ],
  avoid: [
    "Some areas in Five Points at night",
    "Colfax Avenue east of downtown"
  ],
  hotels: [
    { name: "The Crawford Hotel", link: "https://www.thecrawfordhotel.com/", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Crawford_Hotel_Denver.jpg" },
    { name: "Grand Hyatt Denver", link: "https://www.hyatt.com/en-US/hotel/colorado/grand-hyatt-denver/denrd", image: "https://media-cdn.tripadvisor.com/media/photo-s/17/01/d1/56/exterior.jpg" },
    { name: "The Jacquard, Autograph Collection", link: "https://www.marriott.com/en-us/hotels/denaj-the-jacquard-autograph-collection/overview/", image: "https://cache.marriott.com/marriottassets/marriott/DENAJ/denaj-exterior-1175-hor-clsc.jpg" }
  ],
  coworking: [
    "Industrious Denver",
    "WeWork – 16th Street",
    "Alchemy Creative Workspace"
  ],
  transport: [
    "Uber/Lyft widely available",
    "Denver RTD Light Rail",
    "Scooters and bike shares"
  ]
}

const ImageCard = ({ name, link, image }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block mb-4 hover:opacity-90">
    <img src={image} alt={name} className="rounded-lg w-full h-48 object-cover mb-2 shadow" />
    <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
  </a>
)

const Section = ({ title, content }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b pb-1">{title}</h2>
    {Array.isArray(content) && typeof content[0] === 'object' ? (
      <div className="grid md:grid-cols-2 gap-6">
        {content.map((item, i) => <ImageCard key={i} {...item} />)}
      </div>
    ) : Array.isArray(content) ? (
      <ul className="list-disc ml-6 space-y-1 text-gray-800">
        {content.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    ) : (
      <div className="text-gray-800">{content}</div>
    )}
  </div>
)

export default function Home() {
  const [city, setCity] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const handleSearch = () => {
    setShowInfo(city.toLowerCase() === 'denver')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
      <Head>
        <title>Denver City Guide</title>
      </Head>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Denver City Guide</h1>
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Enter a city (e.g., Denver)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {showInfo && (
          <div className="text-lg space-y-10">
            <Section title="Top Places to Visit" content={denverData.attractions} />
            <Section title="Places to Avoid" content={denverData.avoid} />
            <Section title="Hotels for Business Travelers" content={denverData.hotels} />
            <Section title="Coworking Spaces" content={denverData.coworking} />
            <Section title="Getting Around" content={denverData.transport} />
            <Section
              title="Visiting the Main Office"
              content={
                <ul className="list-disc ml-6 space-y-1">
                  <li>Business casual dress code</li>
                  <li>Open-plan layout encourages teamwork</li>
                  <li>C-suite executives have private offices</li>
                </ul>
              }
            />
            <Section
              title="U.S. Visa Requirements"
              content={
                <div>
                  <ul className="list-disc ml-6 space-y-1 mb-3">
                    <li><strong>Visa Waiver Program (VWP):</strong> 90-day stay with ESTA for eligible countries.</li>
                    <li><strong>B-1 Visa:</strong> Business activities like meetings or conferences.</li>
                    <li><strong>B-2 Visa:</strong> Tourism or visiting family/friends.</li>
                  </ul>
                  <p>
                    More info:{' '}
                    <a
                      href="https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      U.S. State Department
                    </a>
                  </p>
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
