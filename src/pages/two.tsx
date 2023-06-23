'use client'
import { Lights } from "@/components/canvas/Lights";
import useWindowSize from "@/helpers/useWindowSize";
import { Box, Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const DOM = () => {

  return (
    <></>
  );
};

// Canvas/R3F components here
const R3F = () => {
  const size = useWindowSize();
  const mesh = useRef(null);
  useFrame(() =>
    mesh.current
      ? mesh.current.rotation.y += 0.01
      : null
  );
  return (
    <>
      <Lights />
      <Html center style={{ maxHeight: size.height, width: size.width < 700 ? size.width - 20 : size.width / 2, overflowY: 'scroll' }}>
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        <h1>I went ahead and wrote what is essentially a summary of my adult life, but if you would rather read a shorter, more "professional" version, here you go:</h1>
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        <p>I'm a Full Stack Software Engineer with a background in Fine Arts. I really enjoy working across the full stack and I'm passionate about crafting maintainable
          software based solutions that aim to enrich the day to day lives of their users. Prior to becoming an engineer, I wore many hats,
          including, but not limited to: bartender, barista, painter, plumber, weaver, landscaper, teacher.</p>
        <h2>Beefy version:</h2>
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        <p>I'll be honest: I hated high school, and the experience and people really turned me off to the idea of college, so I did what I could to get out of there and ended up graduating about 6 months early and immediately began working. My first job was as a dishwasher at a sushi restaurant, where I worked 6 days a week, up to 11 hours a day. I got paid cash under the table,
          so for a kid like me that grew up having very little money, this was thrilling, and I realized, working hard was kind of fun.. My best friend would be going to college in San Francisco, and after a year of visiting him almost every weekend, I decided I too wanted to move to the city, and I had some money saved after all but I felt I needed a stronger justifaction,
          and since I had declared that I was going to be an artist when I was 16, I figured art school was a good start. I moved to SF the year I was going to turn 19, and began attending classes at The Academy of Art. Turns out that school is a giant grift and I really could not stand to continue.
          After dropping out of art school the same semester I had started, I met an artist named <a href="https://claudyjongstra.com/">Claudy Jongstra</a> while I was working at a restaurant down the street from the SFMOMA, called <a href="https://www.theinfatuation.com/san-francisco/reviews/trou-normand">Trou Normand</a>(RIP). After ignoring all of my other tables for 30 minutes and chatting with her, she invited me to come work for her at her farm and studio in Friesland, The Netherlands.
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          5 months later I bought a one-way ticket to Barcelona with my best friend and the rest of my life began. We stayed in the city for a while before travelling to a small village in Bajo Aragon named La Fresneda, where my friends' grandparents had owned a house(and left it to him) and where we would spend almost a month together getting to know the locals and exploring the surrounding areas of the Matarranya river, before he had to return to California for school.
          I stayed another 2 weeks alone, during which I contacted Claudy and arranged for my visit to Friesland. It was at her studio in Spannum, and the Farm at Huns where I learned to spin yarn, weave, make dyes from various plants, and work on installations, ranging from small pieces in private residences, to museums and art expositions in Amsterdam.
          This experience was extremely validating for a young artist like me, and taught me that I was in fact capable of living and working as an artist.
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          {' '} I stayed with Claudy until the day my Schengen Visa expired, heavily considering whether or not I should stay in The Netherlands indefinitely(and illegally.) I decided I didn't want to risk not being able to return to Europe for 10 years and made the long, and depressing trip home.
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          After staying some time with my parents in Sonoma County, still making artwork for Claudy and shipping them back to The Netherlands, I went back to San Francisco, living in various strange places including a basement, a mansion and a 37 foot long sailboat. After a couple years I followed a couple of my best friends to NYC where I started a band, worked at fancy restaurants, and did all the other stuff one does in New York, all while painting and trying to figure out how to make a living doing so.
          After about a year there, a tragedy befell my family and I returned to California to try and figure out my feelings, when Covid-19 happened. It was then, amidst these situations that I finally had the courage to ask myself if I was happy with the path I was on. The answer was no. The art I created was an expression of my innermost feelings, and trying to monetize that was actually just depressing for me and stripped the process of its beauty and intimacy for me. One of my best friends and now mentor, Nico, had
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          {' '} been trying to convince me to learn to code since the time I had moved to New York, but since I "wasn't ready to give up on my dream"( quotes because the dream in question was more of an illusion)
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          quite yet, I paid little attention to him. But alas, considering the current circumstances, I decided to give it a try. I quickly became enamored with coding and dedicated all my free time towards learning and practicing via free resources online.
          After a year of going at it alone, I decided I needed to see what it was like to write code in a collaborative setting, ideally with some kind of teacher(s). After asking around, and some convincing from Nico to not just blindly re-enroll in college, I enrolled in <a href="https://codeworks.me/">Codeworks</a>, a Bootcamp that seemed like an environment where I would be around other motivated individuals with interesting backgrounds, not unlike myself.
          This was in fact true, and we spent 12 hours a day, 6 days a week together in a room learning about algorithms, frameworks, networking, databases, and sharing our thoughts with one another.
          It was incredibly enriching and I made some of the greatest friends I will ever have during that time.
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          {' '}Since then, I haven't stopped learning and building. After a few months of applying, I was hired as a Full Stack Engineer at Retrium, and moved back to San Francisco to be close to my friends. Unfortunately, after about a year, I was laid off from Retrium due to a "reduction in force"(they lost a bunch of money), and I'm now seeking a new role.
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          I'm happy to answer any questions or provide (glowing) references upon request. If you read this far, thank you, and I hope you were able to gain further insight into who I am.
        </p>
      </Html>
      <mesh ref={mesh} position={[-10, -2, -12]} castShadow>
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
