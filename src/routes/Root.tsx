import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import TextBody from '../components/TextBody/TextBody'
import './Root.css'

function App() {

  return (
    <>
    <Header />
    
    <main className='px-16'>
        <div className='mt-10'>
            <TextBody>
                <div>
                This site examines urban renewal in Upper Port, Port Jefferson (NY), through the lens of sustainability
and environmental justice. Upper Port is distinct from the rest of the village in its number
undermaintained and abandoned properties, as well as in its concentration of Latinx businesses and
residences. Deemed “blighted,” the village, via urban renewal, has the potential to claim and raze these
properties—from the unused to the actively occupied Spanish speaking delis and barbershops, as well as a
billiards hall (billar) and dentista—in the name of economic and environmental enhancement. While
revitalization is needed, so too is procedural and distributive justice in the planning, implementation, and
experiences of redevelopment. The historic, false front buildings flanking the western side of 112/Main
Street in Upper Port serve as a cultural hub for the area’s Spanish speaking residents. It is crucial that
revitalization within the urban renewal corridor, and the attending Six Acre Park to be developed nearby,
does not produce demographic and cultural displacement under the guise of sustainable transit-oriented
development. Connected is the downward assessment, and potential decommissioning of the Port
Jefferson Power Plan, which, historically, has been a major source of revenue for the Village of Port
Jefferson.
                </div>
            </TextBody>

            <h2>Port Jefferson's Dilemma</h2>
            <TextBody 
                src='pjbuilding.jpg'
                alt='Port Jefferson'
                caption='Port Jefferson Building'
                width={300}
            >
                <div>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae <span><a href="https://tbrnewsmedia.com/perspective-raising-the-stakes-for-this-years-village-elections/" className='text-blue-400 hover:text-blue-500' target='_blank'>vitae dicta</a></span> sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </div>
            </TextBody>
        </div>

        <div className='mt-10'>
            <h2>Power Plant Revaluation</h2>
            <TextBody 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Port_Jefferson_ferry.JPG/1024px-Port_Jefferson_ferry.JPG'
                alt='Port Jefferson'
                caption='Port Jefferson Power Plant'
                width={300}
                left={true}
            >
                <div>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae <span><a href="https://www.portjeff.com/282/Power-Plant-Working-Group" className='text-blue-400 hover:text-blue-500' target='_blank'>vitae dicta</a></span> sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, qu
                </div>
            </TextBody>
        </div>

        <embed src="test.pdf" type="application/pdf" width="500" height="500"/>
        <video src="villageaddress.mp4" width="600" height="300" controls="controls" autoplay="true" />
    </main>

    <Footer />
    </>
  )
}

export default App
