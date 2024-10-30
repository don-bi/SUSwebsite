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
            <h2>Port Jefferson's Dilemma</h2>
            <TextBody 
                src='https://patch.com/img/cdn20/users/22841595/20211216/013941/styles/patch_image/public/one-north-view2-v3___16133935784.jpg?width=1200'
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
    </main>

    <Footer />
    </>
  )
}

export default App
