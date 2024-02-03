import styles from "../styles/DiagramCard.module.css"

const DiagramCard = ({
    modelType
}) => {
    return (
        <div className={styles.main}>


            {(modelType === "Brain") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVl&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&dk=c1763b3660adf0fb4f7ffbbc5030d0cf9d17275a&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Stomach") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVt&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9Up&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Lungs") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVq&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9V3&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Heart") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVp&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9V9&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Male Digestive System") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVo&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9VB&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Female Digestive System") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVn&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9Vz&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Type 1 Diabetes") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVr&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9W6&paid=o_121d18fd"></iframe>
                : <></>}

            {(modelType === "Type 2 Diabetes") ? <iframe className={styles.viewer} id="embedded-human" allowFullScreen="true" loading="lazy" src="https://human.biodigital.com/viewer/?id=5SVs&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&uaid=Ls9WD&paid=o_121d18fd"></iframe>
                : <></>}

        </div>
    );
}

export default DiagramCard;