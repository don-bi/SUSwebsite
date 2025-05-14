import { useState, useEffect, useRef, useCallback } from 'react';
import TextBody from '../components/TextBody/TextBody';
import Timeline from '../components/Timeline/Timeline';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import DocumentViewer from '../components/DocumentViewer/DocumentViewer';
import Section from '../components/Section/Section'; // Simple wrapper for consistent spacing/headings

// Enhanced timeline data with IDs and key event flags
const timelineEvents = [
  { 
    year: 1963, 
    description: "Village of Port Jefferson incorporates, annexing Upper Port (Echo) from Port Jefferson Station.",
    id: "history",
    isKeyEvent: false
  },
  { 
    year: 1987, 
    description: "Decline in Upper Port begins after LIRR Ronkonkoma line electrification bypasses Port Jefferson line.",
    id: "history" 
  },
  { 
    year: 2013, 
    description: "LIPA's initial Power Supply Agreement expires, opening door for tax challenges.",
    id: "catalyst",
    isKeyEvent: true
  },
  { 
    year: 2016, 
    description: "Village publishes Urban Renewal Plan for Upper Port, citing blight.",
    id: "renewal",
    isKeyEvent: true
  },
  { 
    year: 2017, 
    description: "Mayor Garant introduces 'Uptown Funk' revitalization concept.",
    id: "renewal",
    isKeyEvent: true
  },
  { 
    year: 2018, 
    description: "Settlement reached between LIPA, Town, Village, and School District on power plant assessment reduction ('glide path').",
    id: "catalyst" 
  },
  { 
    year: 2023, 
    description: "The Crossings (affordable housing complex) opens in Upper Port.",
    id: "profile",
    isKeyEvent: false 
  },
  { 
    year: 2024, 
    description: "'One North' luxury apartments near completion. Plans for Six Acre Park advance. Jefferson Plaza receives CRD rezoning.",
    id: "future",
    isKeyEvent: true
  },
];

// Sample Image Data (move to src/data/imageData.ts later)
const galleryImages = [
    { src: '/pjbuilding.jpg', alt: 'Latinx Delis on Main St', caption: 'One North apartments signal the changing skyline of Upper Port.' },
    // Add more images
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [showTimelineNav, setShowTimelineNav] = useState<boolean>(false);
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({
    intro: null,
    catalyst: null,
    history: null,
    profile: null,
    renewal: null,
    future: null,
    research: null,
    references: null
  });
  
  // Flag to prevent scroll handling during programmatic scrolling
  const isScrollingProgrammatically = useRef(false);

  // Handle scrolling to sections when timeline events are clicked
  const scrollToSection = useCallback((sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      isScrollingProgrammatically.current = true;
      setActiveSection(sectionId); // Set active section immediately
      
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Reset the flag after the scroll animation is likely complete
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);
    }
  }, []);

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Skip handling if this is a programmatic scroll
      if (isScrollingProgrammatically.current) return;
      
      // Determine which section is currently in view
      let currentSection = 'intro';
      let maxVisibleHeight = 0;
      
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Calculate how much of the section is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          
          // If this section has more visible area than previous max, it becomes the active section
          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            currentSection = id;
          }
        }
      });
      
      // Only update if section changed and we're not in a programmatic scroll
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
      
      // Show floating timeline after intro section
      const introSection = sectionRefs.current['intro'];
      if (introSection) {
        const shouldShow = window.scrollY > (introSection.offsetTop + introSection.offsetHeight / 2);
        if (shouldShow !== showTimelineNav) {
          setShowTimelineNav(shouldShow);
        }
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check with a slight delay to ensure refs are set
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, showTimelineNav]);

  return (
    <div className="space-y-12 md:space-y-16 relative"> {/* Add vertical spacing between sections */}

      {/* --- Introduction Section --- */}
      <Section title="Upper Port: Redevelopment, Equity, and Community" id="intro" ref={(el) => sectionRefs.current['intro'] = el}>
        <TextBody>
          {/* Keep your refined intro text here */}
          This site examines urban renewal in Upper Port, Port Jefferson (NY), through the lens of sustainability
and environmental justice. Upper Port is distinct from the rest of the village in its number of
undermaintained and abandoned properties, as well as in its concentration of Latinx businesses and
residences. Deemed "blighted," the village, via urban renewal, has the potential to claim and raze these
properties—from the unused to the actively occupied Spanish speaking delis and barbershops, as well as a
billiards hall (billar) and dentista—in the name of economic and environmental enhancement. While
revitalization is needed, so too is procedural and distributive justice in the planning, implementation, and
experiences of redevelopment. The historic, false front buildings flanking the western side of 112/Main
Street in Upper Port serve as a cultural hub for the area's Spanish speaking residents. It is crucial that
revitalization within the urban renewal corridor, and the attending Six Acre Park to be developed nearby,
does not produce demographic and cultural displacement under the banner of sustainable transit-oriented
development. Connected is the downward assessment, and potential decommissioning of the Port
Jefferson Power Plant, which, historically, has been a major source of revenue for the Village of Port
Jefferson.
        </TextBody>
      </Section>

      {/* --- Interactive Timeline Section --- */}
      <div className="-mt-12 md:-mt-16 pb-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner relative z-0 overflow-visible">
        <div className="max-w-5xl mx-auto px-4 relative">
          <h2 className="text-2xl font-bold mb-3 text-center text-gray-800 dark:text-gray-200">
            Port Jefferson Timeline: A Story of Change
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Explore key events in Port Jefferson's history. Click on events to learn more.
          </p>
          <div className="pt-0 mt-0">
            <Timeline 
              events={timelineEvents} 
              activeSection={activeSection}
              onEventClick={scrollToSection}
            />
          </div>
          {/* Add a clear element to ensure content after the timeline flows properly */}
          <div className="clear-both h-4"></div>
        </div>
      </div>

      {/* --- The Catalyst Section --- */}
      <Section title="The Catalyst: Power Plant Reassessment" id="catalyst" ref={(el) => sectionRefs.current['catalyst'] = el}>
        <TextBody>
          <div>
            {/* Briefly explain the LIPA situation based on pages 4-6 */}
            The financial landscape of Port Jefferson has been significantly impacted by the reassessment of the Port Jefferson Power Plant. For decades, the plant's high assessment provided substantial revenue, keeping resident taxes relatively low. Following the expiration of agreements preventing tax challenges in 2013, the Long Island Power Authority (LIPA) pursued a significant reduction in the plant's assessed value. A settlement in 2018 initiated an eight-year "glide path" gradually reducing the plant's tax contribution, forcing the Village and School District to find alternative revenue streams or raise taxes. This financial pressure became a primary driver for pursuing large-scale redevelopment, particularly in Upper Port. <span className='italic text-sm text-gray-600'>(Charboneau, 2024, pp. 4-6)</span>
          </div>
        </TextBody>
      </Section>

      {/* --- Upper Port History Section --- */}
      <Section title="Upper Port: Historical Context" id="history" ref={(el) => sectionRefs.current['history'] = el}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">From Echo to Upper Port</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Originally known as "Echo," Upper Port was annexed from Port Jefferson Station in 1963 when the Village of Port Jefferson incorporated. This area has a distinct identity and history separate from the more tourist-oriented Lower Port.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Economic Decline</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The decline of Upper Port began in the 1980s after the LIRR Ronkonkoma line was electrified, bypassing the Port Jefferson line. This change in transportation infrastructure had lasting economic impacts on the area.
            </p>
          </div>
        </div>
      </Section>

      {/* --- Upper Port Profile Section --- */}
      <Section title="Upper Port: A Closer Look" id="profile" ref={(el) => sectionRefs.current['profile'] = el}>
         {/* Use Image Gallery Here */}
         <ImageGallery images={galleryImages} />
         <TextBody>
            <div>
                {/* Describe Upper Port based on pages 1, 3, 9, 10, 11 */}
                Upper Port presents a distinct character compared to the tourist-oriented Lower Port (Downtown). Historically known as "Echo" and annexed from Port Jefferson Station in 1963, it experienced decline after changes to the LIRR service in the 1980s. Today, it hosts a concentrated Latinx population with businesses catering to this community – including delis, barbershops, a billiards hall, and a dentist, often located in buildings with unique, older architectural styles like false fronts. However, the area also suffers from vacant storefronts and properties showing deferred maintenance, particularly along the east side of Main Street (Route 112). This visual state contributed to the official "blight" designation used to justify the Urban Renewal Plan. This plan encompasses an eight-block area identified as over 60% Hispanic in the 2010 census data. <span className='italic text-sm text-gray-600'>(Charboneau, 2024, pp. 1, 9-10)</span>
            </div>
         </TextBody>
      </Section>

      {/* --- Redevelopment & Displacement Section --- */}
      <Section title="Urban Renewal: Progress or Displacement?" id="renewal" ref={(el) => sectionRefs.current['renewal'] = el}>
        <TextBody>
            <div>
                {/* Explain the plan, blight, eminent domain, concerns - pages 1, 2, 7, 8, 9 */}
                Driven by the need for revenue and framed by the 2016 Urban Renewal Plan, redevelopment is slowly, but steadily, transforming Upper Port. The plan, leveraging the state's definition of "blight," grants the Village potential power of eminent domain to acquire and demolish properties within the designated zone. New apartment complexes like The Hills (market rate), The Crossings (affordable), and the soon-to-be-completed One North (luxury) are replacing former businesses and vacant lots. While development addresses underutilization, concerns about displacement are significant. The plan explicitly targets demolition of existing structures, many housing Latinx businesses and residences. As former Trustee Bruce Miller and others noted, there's suspicion that some property owners (many being distant LLCs) allowed buildings to deteriorate, anticipating buyouts facilitated by the renewal plan and subsidies like PILOTs granted via the Brookhaven IDA. Critically, the voices of the existing Latinx residents and business owners, those most vulnerable to displacement, have been largely absent from the planning process. <span className='italic text-sm text-gray-600'>(Charboneau, 2024, pp. 1-2, 7-9)</span>
            </div>
        </TextBody>

        <div className="text-center mb-6">Below are the plans for Upper Port</div>

        <div className="flex justify-center md:flex-row flex-col">
            <DocumentViewer pdfUrl="/renewalplan.pdf" caption="2016 Urban Renewal Plan" />
            <DocumentViewer pdfUrl="/finalplan.pdf" caption="2030 Plan Update" />
        </div>
        
        {/* Add a visual callout for the blight definition */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-md">
          <h4 className="font-semibold text-amber-800 dark:text-amber-400">What is "Blight"?</h4>
          <p className="text-amber-700 dark:text-amber-300">
            The term "blight" is a legal designation that allows municipalities to exercise powers like eminent domain. 
            In New York State, it's defined as areas showing signs of "economic underdevelopment and stagnation" or 
            properties that are "substandard and insanitary." Critics argue this definition is subjective and has historically 
            been used to target minority communities.
          </p>
        </div>
      </Section>

       {/* --- Future Vision Section --- */}
       <Section title="Future Directions: Parks, Trains, and Universities" id="future" ref={(el) => sectionRefs.current['future'] = el}>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Six Acre Park</h3>
                <p>
                  The planned Six Acre Park is promoted as an environmental amenity and "living laboratory," expected to enhance local ecology and property values.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">LIRR Electrification</h3>
                <p>
                Persistent advocacy for electrification of the LIRR Port Jefferson line, framed within climate goals and associated transit-oriented development potential, is also very much a matter of revenue generation
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">University Partnership</h3>
                <p>
                  The Village's partnership with Stony Brook University ("Seawolves Country") signals an intent to draw university-affiliated populations to new housing.
                </p>
              </div>
            </div>
            <TextBody>
                <div>
                    {/* Discuss Six Acre Park, LIRR electrification, SBU link - pages 2, 11, 12, 13 */}
                    Beyond the immediate building developments, future plans aim to further reshape Upper Port. The creation of Six Acre Park, east of the main corridor, is promoted as an environmental amenity and "living laboratory," expected to enhance local ecology and property values. There is persistent advocacy for the electrification of the LIRR Port Jefferson line, which is framed within climate goals (CLCPA) and strongly linked to increasing transit-oriented development potential—yet in attracting new populations, electrification might further  displacement pressures felt by current residents within the urban renewal area. The Village's partnership with Stony Brook University ("Seawolves Country") signals an intent to draw university-affiliated populations—students, faculty, and staff—to the new housing, potentially further shifting the area's cultural and economic makeup. <span className='italic text-sm text-gray-600'>(Charboneau, 2024, pp. 2, 11-13)</span>
                </div>
            </TextBody>
       </Section>

      {/* --- Research Document Section --- */}
      <Section title="Read Ongoing Research from the 2024 SACRPH Conference" id="research" ref={(el) => sectionRefs.current['research'] = el}>
          <DocumentViewer pdfUrl="SACRPH.pdf" />
          {/* Optionally add links to cited articles */}
      </Section>

       {/* --- Video Embed --- */}
       <Section title="Village Perspectives">
            {/* Consider a slightly nicer video player wrapper if needed */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video src="villageaddress.mp4" width="100%" controls className="mx-auto z-20">
                  Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
              <p className="text-white text-center">Excerpt from Mayor Margot Garant's 2017 State of the Village Address.</p>
            </div>
       </Section>

       {/* --- Conclusion/Call to Reflection --- */}
       {/* <Section title="Reflections on Urban Renewal">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-center">Key Questions to Consider</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p className="italic text-gray-700 dark:text-gray-300">
                  "How can urban renewal balance economic development with the preservation of existing cultural communities?"
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p className="italic text-gray-700 dark:text-gray-300">
                  "What role should existing residents play in planning processes that will directly impact their neighborhoods?"
                </p>
              </div>
            </div>
          </div>
       </Section> */}

       {/* --- References Section --- */}
       <Section title="References" id="references" ref={(el) => sectionRefs.current['references'] = el}>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">References</h3>
           {/* MLA Style Citation */}
           <div>
             <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">MLA Citation</h4>
             <p className="text-gray-700 dark:text-gray-300 pl-8 text-sm" style={{ textIndent: "-2em", marginLeft: "2em" }}>
               Charboneau, Adam. "Inequitable Planning for a Sustainable Future in Port Jefferson, New York." 2024.
             </p>
           </div>
         </div>
       </Section>

    </div>
  );
}
