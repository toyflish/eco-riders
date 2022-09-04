import Page from '@/components/page'
import Section from '@/components/section'
import Geometer from '@/components/Geometer'

const Index = () => (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold text-center text-zinc-800 dark:text-zinc-200'>
				&#8220;If you ride like lightning, you&#39;re gonna crash like
				thunder.&#8221;
			</h2>
			<Geometer />
			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'></p>
			</div>
		</Section>
	</Page>
)

export default Index
