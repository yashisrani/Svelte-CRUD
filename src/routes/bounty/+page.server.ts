import { Root } from '../../contracts/root'
import { DefaultProvider, bsv} from 'scrypt-ts'
import { NeucronSigner } from 'neucron-signer'

/** @type {import('./$types').Actions} */
export const actions = {
    deploy: async ({ request }) => {

      const provider = new DefaultProvider({ network: bsv.Networks.mainnet }) 
      const signer = new NeucronSigner(provider)
      let instance;
        
      const data = await request.formData();
      await signer.login('sales@timechainlabs.io', 'string')
      await Root.loadArtifact()
      const square = BigInt(data.get('square'))
      instance = new Root(square)
      
      await instance.connect(signer)
      console.log("instance connected successfully" + instance)
      const deployTx = await instance.deploy(Number(data.get('amount')))
      
      console.log(
          'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
      )
      return { success: true, tx: deployTx.id, instance };
	},
    unlock: async ({ request }) => {
       const data = await request.formData();
    
        const root = data.get('root')
        await new Promise((f) => setTimeout(f, 2000))
        const { tx: callTx } = await instance.methods.unlock(root)
        console.log(
            'contract unlocked successfully : https://whatsonchain.com/tx/' +
                callTx.id
        )      
        const tx = 'fadf' 
        return { success: true, tx };
        },

};
