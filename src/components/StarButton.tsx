import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './StarButton.css'

const STORY_PARAGRAPHS = [
  'In the far southern reaches of Midland lies a barren sea of sand.',
  'Were it not for the careful records of wandering monks, no one would remember that this wasteland was once a kingdom of unimaginable splendor. Ancient texts speak of towering castles, grand arenas, flourishing forests, crystal lakes, and cities adorned with works of art beyond compare.',
  'Who lived here?',
  'The Midzards, of course.',
  'This was their homeland—the land promised to them by the holy, all-seeing Primevil. In the First Age, the all-seeing Primevil gave the Midzards a simple command: keep the gates of the realm open to all peoples, and the land would prosper forever.',
  'And prosper it did.',
  'But thousands of years ago, long before the final Orc Wars, the first great horde descended upon Midland. The Orcs pillaged villages, razed towns, and spread terror wherever they marched. Fearing extinction, the Midzards abandoned the command of the all-seeing Primevil and sealed their borders, closing their kingdom to the outside world.',
  'Though the Orcs were cruel, the all-seeing Primevil showed no mercy.',
  'The covenant had been broken.',
  'And so the curse was spoken.',
  'The rivers vanished. The forests withered. The lakes dried to dust. Great cities crumbled beneath the relentless wind. Within a generation, the once-glorious kingdom had become a desert. Today, only the faint ringing of buried church bells and the shattered ruins beneath the dunes hint at the greatness that once stood there.',
  'The Midzards remain.',
  'Tall. Proud. Unbroken.',
  'They live beneath the scorching sun, forever carrying the weight of their ancestors\' sin. They drive cattle across endless dunes. They fend off goblin raiders and wandering beasts. They build homes from the petrified husks of ancient trees and raise their children on stories of what Midland used to be.',
  'And among those stories, one legend rises above all others.',
  'The tale of the Great Midzard.',
  'The Platinum Midzard.',
  'The Holy Cowboy.',
  'It is said that one day a Midzard clad in silver-white armor will ride from the desert horizon. Armed with a weapon forged before the First Age, he will challenge the all-seeing Primevil himself. Their battle will shake the heavens, break the ancient curse, and restore Midland to its former glory.',
  'The rivers will flow once more.',
  'The forests will return.',
  'The bells of the old churches will ring again.',
  'At least, that is what the stories say.',
  'And stories are only stories.',
  'Prophecies are only prophecies.',
  'Surely no Midzard could challenge the all-seeing Primevil.',
  'Surely no curse could ever be broken.',
  'Surely the Platinum Midzard is nothing more than a myth...',
  '...right?',
]

const DESKTOP_BREAKPOINT = 641

function fitStoryText(content: HTMLElement) {
  content.style.fontSize = ''
  let size = 11

  content.style.fontSize = `${size}px`

  while (content.scrollHeight > content.clientHeight && size > 5) {
    size -= 0.25
    content.style.fontSize = `${size}px`
  }
}

export function StarButton() {
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useLayoutEffect(() => {
    if (!open || window.innerWidth < DESKTOP_BREAKPOINT) return

    const box = boxRef.current
    const content = contentRef.current
    if (!box || !content) return

    const runFit = () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        content.style.fontSize = ''
        return
      }

      fitStoryText(content)
    }

    runFit()
    window.addEventListener('resize', runFit)
    return () => window.removeEventListener('resize', runFit)
  }, [open])

  return (
    <>
      <button
        type="button"
        className={`star-button ${open ? 'star-button--clicked' : ''}`}
        aria-label="Click me"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <img
          className="star-button__img"
          src="/assets/click-me.png"
          alt=""
          draggable={false}
        />
      </button>

      {open &&
        createPortal(
          <div
            className="story-modal"
            role="dialog"
            aria-modal="true"
            aria-label="The Story of Midland"
            onClick={() => setOpen(false)}
          >
            <div
              ref={boxRef}
              className="story-modal__box"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="story-modal__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
              <div ref={contentRef} className="story-modal__content">
                {STORY_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
