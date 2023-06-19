import { Lights } from "@/components/canvas/Lights";
import useWindowSize from "@/helpers/useWindowSize";
import { Box, OrbitControls } from "@react-three/drei";

const DOM = () => {
  const size = useWindowSize();
  return (
    <div
      style={{
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <h1>This is pretty lengthy, if you want the short, professional, version, here you go:</h1>
      <p style={{
        width: '50%'
      }}>Artist and Software Engineer. I enjoy working across the full stack and I am passionate about crafting maintainable
        software based solutions which enrich the day to day lives of their users. Prior to becoming an engineer, I wore many hats,
        including, but not limited to: bartender, barista, painter, plumber, weaver, landscaper, teacher.</p>
      <h2>Beefy version:</h2>
      {/*eslint-disable-next-line react/no-unescaped-entities*/}
      <p style={{
        width: '75%'
      }}>After dropping out of Art school at age 19, I met an artist named Claudy Jongstra while I was working at a restaurant down the street from the SFMOMA. After ignoring my work for 30 minutes and chatting with her, she invited me to come work for her at her Farm and Studio in Friesland, The Netherlands.
        5 months later I bought a one-way ticket to Barcelona with my best friend and the rest of my life began. We stayed in the city for a while before travelling to a small village in Lower Aragon named La Fresneda, where we would spend almost a month together getting to know the locals and exploring the surrounding areas of the Matarranya river, before he had to return to California for school.
        I stayed another 2 weeks alone, during which I contacted Claudy and arranged for my visit to Friesland. I arrived to Friesland already completely transformed, not aware of the further transformations which were to come. It was at her studio in Spannum, and the Farm at Huns where I learned to spin yarn, weave, make dyes from various plants, and work on installations, ranging from small pieces in private residences, to museums and art expositions in Amsterdam.
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        I stayed with Claudy until the last day my Schengen Visa expired, heavily considering whether or not I should stay in The Netherlands indefinitely(and illegally.) I decided I didn't want to risk not being able to return to Europe for 10 years and made the long, and depressing trip home.
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        After staying some time with my parents in Sonoma County, still making artwork for Claudy and shipping them back to The Netherlands, I went back to San Francisco, living in various strange places including a basement, a mansion and a 37 foot long sailboat. After a couple years I followed a couple of my best friends to NYC where I started a band, worked at fancy restaurants, and fell in love, all while painting and trying to make a living doing so. A huge tragedy befell my family and I returned to California to be with them, when Covid-19 happened. It was then, in the midst of this awful situation that I finally asked myself if I was happy with the path I was on. The answer was no. I lived for my art, and trying to monetize it became dark and stripped it of its beauty and therapy for me. One of my best friends and now mentor, Nico, had been trying to convince me to learn to code since New York, but since I 'wasn't ready to give up on my dream' quite at that time, I paid little attention to him. But considering the circumstances, I decided to give it a try. I quickly fell in love and dedicated all my free time towards trying to unravel the mystery that was 'programming'.
        After a year of going at it alone, I decided I needed to see what it was like in a collaborative setting, assuming I would love it even more and learn in a way that was more appropriate for me. After asking around, and some convincing from Nico, I enrolled in Codeworks, a Bootcamp that seemed like an environment where I would be around other motivated individuals with interesting backgrounds, and I was right in that assumption.
        We spent 12 hours a day, 6 days a week together in a room learning about algorithms, frameworks, networking, databases, and sharing our thoughts with one another. It was incredibly enriching and I made some of the greatest friends I will ever have during that time. Since then, I have worked as a Full Stack Engineer at one company for about a year, and am now seeking a new role. Thanks for reading this far, and I hope you were able to gain further insight into who I am.</p>
    </div>
  );
};

// Canvas/R3F components here
const R3F = () => {
  return (
    <>
      <OrbitControls />
      <Lights movedOn={false} />
      <mesh position={[0, -2, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="darksalmon" />
      </mesh>
      <mesh position={[0, -2.5, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[240, 240]} />
        <meshStandardMaterial color="honeydew" />
      </mesh>
    </>
  );
};



export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "About Me page",
    },
  };
}
