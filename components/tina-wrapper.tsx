import React, { useState } from "react";
import { Form, TinaCMS, useCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../utils";
import { useGraphqlForms } from "tina-graphql-gateway";
import { LoadingPage } from "./Spinner";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = (props) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(),
      },
      sidebar: {
        placeholder: SidebarPlaceholder,
      },
      toolbar: true,
      enabled: true,
    });
  }, []);

  /** Disables the TinaCMS "Media Manager" */
  cms.plugins.all("screen").forEach((plugin) => {
    if (plugin.name === "Media Manager") {
      cms.plugins.remove(plugin);
    }
  });

  return (
    <TinaCloudAuthWall cms={cms}>
      <Inner {...props} />
    </TinaCloudAuthWall>
  );
};

const Inner = (props) => {
  const [form, setForm] =useState<Form>()
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
    formify: ({createForm, formConfig,skip})=>{
      console.log(formConfig.id)
      if(formConfig.id === 'getPostsDocument'){
        const form = createForm(formConfig)
        setForm(form)
        return skip()
      }
      return createForm(formConfig)
    }
  });
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
          <div
            style={{
              pointerEvents: "none",
            }}
          >
            {props.children(props)}
          </div>
        </>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload, form: form })
      )}
    </>
  );
};

export default TinaWrapper;
