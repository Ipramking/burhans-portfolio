import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROFILE, DEFAULT_SOCIALS, DEFAULT_EMAILJS, getSocialIcon } from '../../data/defaults';

type FormData = { name: string; email: string; subject: string; message: string; };

function FloatingInput({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const hasVal = !!(props.value as string)?.length;
  return (
    <div style={{ position:'relative' }}>
      <input {...props} onFocus={e => { setFocused(true); props.onFocus?.(e); }} onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{ width:'100%', padding:'1.25rem 1rem 0.5rem', background:'var(--surface)', border:`1.5px solid ${error ? '#f87171' : focused ? 'var(--accent)' : 'var(--border)'}`, borderRadius:12, color:'var(--text)', fontSize:'0.95rem', outline:'none', transition:'border-color 0.2s', boxShadow: focused ? '0 0 0 3px color-mix(in srgb, var(--accent) 10%, transparent)' : 'none', ...props.style }} />
      <label style={{ position:'absolute', left:'1rem', top: (focused || hasVal) ? '0.4rem' : '0.9rem', fontSize: (focused || hasVal) ? '0.65rem' : '0.9rem', color: focused ? 'var(--accent)' : 'var(--muted)', transition:'all 0.2s', pointerEvents:'none', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.05em', textTransform:'uppercase' }}>
        {label}
      </label>
      {error && <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'#f87171', marginTop:'0.3rem' }}>{error}</p>}
    </div>
  );
}

function FloatingTextarea({ label, error, ...props }: { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const hasVal = !!(props.value as string)?.length;
  return (
    <div style={{ position:'relative' }}>
      <textarea {...props} onFocus={e => { setFocused(true); props.onFocus?.(e); }} onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{ width:'100%', padding:'1.25rem 1rem 0.75rem', paddingTop: (focused||hasVal) ? '1.75rem' : '1.25rem', background:'var(--surface)', border:`1.5px solid ${error ? '#f87171' : focused ? 'var(--accent)' : 'var(--border)'}`, borderRadius:12, color:'var(--text)', fontSize:'0.95rem', outline:'none', resize:'vertical', minHeight:140, transition:'border-color 0.2s, padding 0.15s', boxShadow: focused ? '0 0 0 3px color-mix(in srgb, var(--accent) 10%, transparent)' : 'none', lineHeight:1.65, ...props.style }} />
      <label style={{ position:'absolute', left:'1rem', top: (focused||hasVal) ? '0.4rem' : '0.9rem', fontSize: (focused||hasVal) ? '0.65rem' : '0.9rem', color: focused ? 'var(--accent)' : 'var(--muted)', transition:'all 0.2s', pointerEvents:'none', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.05em', textTransform:'uppercase' }}>
        {label}
      </label>
      {error && <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'#f87171', marginTop:'0.3rem' }}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [profile]  = useLocalStorage(LS.profile,  DEFAULT_PROFILE);
  const [socials]  = useLocalStorage(LS.socials,  DEFAULT_SOCIALS);
  const [ejsConf]  = useLocalStorage(LS.emailjs,  DEFAULT_EMAILJS);
  const ref        = useRef<HTMLElement>(null);
  const inView     = useInView(ref, { once:true, margin:'-80px' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm<FormData>();
  const values = watch();

  const onSubmit = async (data: FormData) => {
    if (!ejsConf.serviceId || !ejsConf.templateId || !ejsConf.publicKey) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(ejsConf.serviceId, ejsConf.templateId, {
        from_name: data.name, from_email: data.email,
        subject: data.subject, message: data.message,
        to_email: profile.email || DEFAULT_PROFILE.email,
      }, ejsConf.publicKey);
      setStatus('sent');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>
        {/* Left */}
        <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.7 }}>
          <span className="section-label">Get in touch</span>
          <h2 className="section-title">Let's <span className="gradient-text">Talk</span></h2>
          <p style={{ color:'var(--text-2)', fontSize:'1.05rem', lineHeight:1.8, margin:'1rem 0 2rem' }}>
            Have a project in mind, a question, or just want to say hi? My inbox is always open.
          </p>
          <a href={`mailto:${profile.email || DEFAULT_PROFILE.email}`}
            style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.9rem', color:'var(--accent)', display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            {profile.email || DEFAULT_PROFILE.email}
          </a>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
            {socials.map((s, i) => (
              <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer" whileHover={{ y:-2 }}
                className="glass"
                style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.6rem 1.1rem', borderRadius:10, fontFamily:'JetBrains Mono, monospace', fontSize:'0.78rem', color:'var(--text-2)', transition:'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget.style.color)='var(--accent)'; (e.currentTarget.style.borderColor)='rgba(129,140,248,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget.style.color)='var(--text-2)'; (e.currentTarget.style.borderColor)=''; }}
                dangerouslySetInnerHTML={{ __html: `<span style="width:16px;height:16px;flex-shrink:0">${getSocialIcon(s.name)}</span>${s.name}` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.7, delay:0.1 }}>
          <div className="glass contact-form" style={{ padding:'2rem', borderRadius:20 }}>
            {status === 'sent' ? (
              <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} style={{ textAlign:'center', padding:'2rem' }}>
                <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✓</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.2rem', marginBottom:'0.5rem' }}>Message sent!</h3>
                <p style={{ color:'var(--text-2)', fontSize:'0.9rem' }}>I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
                <div className="contact-name-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <FloatingInput label="Name" value={values.name||''} error={errors.name?.message}
                    {...register('name', { required:'Required' })} />
                  <FloatingInput label="Email" type="email" value={values.email||''} error={errors.email?.message}
                    {...register('email', { required:'Required', pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:'Invalid email' } })} />
                </div>
                <FloatingInput label="Subject" value={values.subject||''} error={errors.subject?.message}
                  {...register('subject', { required:'Required' })} />
                <FloatingTextarea label="Message" value={values.message||''} error={errors.message?.message}
                  {...register('message', { required:'Required', minLength:{ value:20, message:'At least 20 characters' } })} />

                {status === 'error' && (
                  <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.78rem', color:'#f87171', textAlign:'center' }}>
                    {!ejsConf.serviceId ? 'EmailJS not configured — set up keys in the admin panel.' : 'Failed to send. Please try again.'}
                  </p>
                )}

                <motion.button type="submit" disabled={status==='sending'} whileTap={{ scale:0.97 }}
                  className="btn btn-primary" style={{ width:'100%', fontSize:'0.95rem', padding:'0.9rem', opacity: status==='sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? (
                    <span style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                      <motion.span animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }} style={{ display:'block', width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%' }} />
                      Sending…
                    </span>
                  ) : 'Send Message →'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #contact .container { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          .contact-name-row { grid-template-columns: 1fr !important; }
          .contact-form { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
