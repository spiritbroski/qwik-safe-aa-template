import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { MUIButton  } from '~/integrations/react/mui';
import { SafeAuthKit, SafeAuthProviderType } from '@spiritbro1/auth-kit'
import {action$} from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
export const useAddUser = action$(() => {
    console.log("sda")
    return {
        success: true
    };
});
export const onRequest:RequestHandler = ({ headers, query,method,json,status }) => {
    headers.set('Access-Control-Allow-Credentials', "true")
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    headers.set(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            )
    if (method === 'OPTIONS') {
        status(200)
        return
    }
   
};
export async function panda(){

      const safeAuthKit = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          chainId: '0x5',
    authProviderConfig: {
              rpcTarget: "https://goerli.blockpi.network/v1/rpc/public",
        clientId: 'BF1Htzuyp_M9JJz1GD8ee0_2adbqswS9zEW1qbbnY7xC4jp962lVy3C564kHQRnag0eeZHuiXy6SgoQ3MToO80w',
        network: 'testnet',
        theme: 'light'  // The theme to use for the Web3Auth modal
          }
      })
      await safeAuthKit?.signIn();




}
export default component$(() => {

    const action = useAddUser();
  return (
    <>
    <MUIButton client:only   host:onClick$={async () => {
        const { value } = await action.run({ name: 'John' });
        console.log("dsadsa")
        console.log(value);
    }}>server only</MUIButton>

    <MUIButton client:only host:onClick$={()=>panda()}>
    sadsajdjsak
    </MUIButton>

    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik React',
};
